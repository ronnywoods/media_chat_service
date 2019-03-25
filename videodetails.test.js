import config from './knexfile.js';
import db from './database/index.js';
import seedHelper from './database/seedHelpers.js';
const seedDb = seedHelper.seedDb;
import clientHelpers from './client/clientHelpers.js';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';
import React from 'react';
import Channel from './client/components/channel.jsx';
import Main from './client/components/main.jsx';
import app from './server/app.js';
import 'jest-dom/extend-expect';
import styled, { find } from 'styled-components/test-utils';
import { ShowView } from './client/components/description.jsx';
import { SubButton } from './client/components/subscribe.jsx';
import { UnSubButton } from './client/components/subscribe.jsx';

let server;

beforeEach((done) => {
  server = app.listen(4568, done);
});

afterEach((done) => {
  server.close();
  done();
});

afterAll(() => {
  db.destroy();
});

const seedAsync = (userSeedCount, videoSeedCount, commentSeedCount) => {
  return db.migrate.rollback([config]).then(() => {
    return db.migrate.latest([config]);
  }).then(() => {
    return seedDb(userSeedCount, videoSeedCount, commentSeedCount, db);
  });
};

const getVideoDataAsync = (id, url) => {
  return new Promise((resolve, reject) => {
    clientHelpers.getVideoData(id, url, (data) => {
      resolve(data);
    }, (err) => reject(err)); 
  });
};

const subscribeChangeAsync = (user, channel, action) => {
  return new Promise((resolve, reject) => {
    clientHelpers.subscribeChange(user, channel, action, (data) => {
      resolve(data);
    }, (err) => reject(err));
  });
};

let mockData = {
  videoDetails: {
    channel: 'The Cats and Dogs Show',
    description: 'Stumbled across this and just had to record a video.  Check out how happy he is :)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.  Vivamus nec nisi quis sem dictum vehicula non sed ligula.  Sed iaculis maximus condimentum.\n\nCurabitur placerat augue sed varius porttitor.  Curabitur leo tortor, varius sed mauris ac, vulputate ultricies ipsum.\n\nQuisque at ipsum libero.',
    id: 1,
    image: 'https://images.unsplash.com/photo-1547623542-de3ff5941ddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    publishDate: '2019-02-05T11:30:51.000Z',
    subscribers: 1000,
    username: 'testUser'
  },
  userSubscribes: [],
  userCommentFeelings: [],
  userImage: {
    username: 'testUser',
    image: 'https://images.unsplash.com/photo-1537150246321-7b953e34013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    subscribers: 0
  },
  commentDetails: [
    {id: 1, commentDate: '2019-03-06T05:30:00.000Z', videoId: 1, parentId: 0, username: 'testUser', likes: 10, dislikes: 5, text: 'this is a comment', image: 'https://images.unsplash.com/photo-1537150246321-7b953e34013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'},
    {id: 2, commentDate: '2019-03-06T05:35:00.000Z', videoId: 1, parentId: 1, username: 'The Cats and Dogs Show', likes: 20, dislikes: 10, text: 'this is a reply to the comment', image: 'https://images.unsplash.com/photo-1547623542-de3ff5941ddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'},
    {id: 3, commentDate: '2019-03-06T06:20:00.000Z', videoId: 1, parentId: 2, username: 'testUser', likes: 30, dislikes: 15, text: 'this is a reply to the reply', image: 'https://images.unsplash.com/photo-1537150246321-7b953e34013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'}
  ]
};

describe('Database initialization', () => {
  
  test('seeds tables with specified number of records', () => {
    let userCount;
    let videoCount;
    let commentCount;
    const args = [50, 100, 500];
    return seedAsync(...args).then(() => {
      return db.select('username').from('users');
    }).then((users) => {
      userCount = users.length;
      return;
    }).then(() => {
      return db.select('id').from('videos');
    }).then((videoIds) => {
      videoCount = videoIds.length;
      return;
    }).then(() => {
      return db.select('id').from('comments');
    }).then((commentIds) => {
      commentCount = commentIds.length;
      expect(userCount).toBe(args[0]);
      expect(videoCount).toBe(args[1]);
      expect(commentCount).toBe(args[2]);
    });
  });

});

describe('APIs', () => {

  const organizeDetails = (data) => {
    let result = {
      vd: data.videoDetails,
      cd: data.commentDetails,
      us: data.userSubscribes,
      ui: data.userImage,
      ucf: data.userCommentFeelings,
      userSubscriptions: data.userSubscribes.map(item => item.channel)
    };
    return result;
  };
  
  test('provides all necessary information to client on getVideoData request to /watch/details with valid videoId', () => {
    return seedAsync(15, 30, 50).then(() => {
      return getVideoDataAsync(1, 'http://localhost:4568/watch/details');
    }).then((result) => {
      return organizeDetails(result);
    }).then((result) => {
      expect(result.vd.channel && result.vd.description && result.vd.publishDate && result.vd.subscribers).toBeTruthy();
    });
  });

  test('provides 10 appropriate suggested channel subscriptions when at least 10 are available', () => {
    let video;
    return getVideoDataAsync(1, 'http://localhost:4568/watch/details').then((result) => {
      return organizeDetails(result);
    }).then((result) => {
      video = result;
      return getVideoDataAsync(result.vd.channel, 'http://localhost:4568/watch/suggestions');
    }).then((result) => {
      expect(result.length).toBe(10);
      let subscribesIncluded = false;
      let userIncluded = false;
      let currChannelIncluded = false;
      result.forEach((suggestion) => {
        if (suggestion.selectedChannel === 'testUser') {
          userIncluded = true;
        }
        if (video.userSubscriptions.indexOf(suggestion.selectedChannel) !== -1) {
          subscribesIncluded = true;
        }
        if (suggestion.selectedChannel === video.vd.channel) {
          currChannelIncluded = true;
        }
      });
      expect(subscribesIncluded).toBe(false);
      expect(userIncluded).toBe(false);
      expect(currChannelIncluded).toBe(false);
    });
  });

  test('provides all available suggestions if less than 10 are available', () => {
    let video;
    return seedAsync(10, 30, 50).then(() => {
      return getVideoDataAsync(1, 'http://localhost:4568/watch/details');
    }).then((data) => {
      return organizeDetails(data);
    }).then((data) => {
      video = data;
      return getVideoDataAsync(data.vd.channel, 'http://localhost:4568/watch/suggestions');
    }).then((result) => {
      if (video.userSubscriptions.indexOf(video.vd.channel) >= 0 || video.vd.channel === 'testUser') {
        expect(result.length).toBe(9);
      } else {
        expect(result.length).toBe(8);
      }
    });
  });

  test('increments and decrements subscribers', () => {
    let subscribers;
    let channel;
    return getVideoDataAsync(1, 'http://localhost:4568/watch/details').then((data) => {
      return organizeDetails(data);
    }).then((data) => {
      subscribers = data.vd.subscribers;
      channel = data.vd.channel;
      return subscribeChangeAsync('testUser', channel, 'subscribe');
    }).then(() => {
      return getVideoDataAsync(1, 'http://localhost:4568/watch/details');
    }).then((data) => {
      return organizeDetails(data);
    }).then((data) => {
      expect(data.vd.subscribers).toEqual(subscribers + 1);
    }).then(() => {
      return subscribeChangeAsync('testUser', channel, 'unsubscribe');
    }).then(() => {
      return getVideoDataAsync(1, 'http://localhost:4568/watch/details');
    }).then((data) => {
      return organizeDetails(data);
    }).then((data) => {
      expect(data.vd.subscribers).toEqual(subscribers);
    });
  });

});

// describe('React components', () => {

//   let rendered;

//   beforeEach(() => {
//     rendered = render(<Main videoData={mockData} subscribed={false} />);
//   });

//   afterEach(() => cleanup());

//   test('renders channel details', () => {
//     expect(rendered.getByText(mockData.videoDetails.channel)).toBeInTheDocument();
//     expect(rendered.container.querySelector('img').src).toBe(mockData.videoDetails.image);
//     // expect(rendered.getByText('Published on Feb 5, 2019')).toBeInTheDocument();
//     expect(rendered.getByText(`Published on ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(mockData.videoDetails.publishDate))}`)).toBeInTheDocument();
//     expect(rendered.queryByText('Recommended for you')).toBeNull();
//     expect(find(rendered.container, ShowView).innerHTML).toBe('SHOW MORE');
//   });

//   test('handles subscribe when subscribe is clicked', () => {
//     let button = find(rendered.container, SubButton);
//     expect(button).toBeInTheDocument();
//     fireEvent.click(button);
//     wait(() => rendered.getByText(rendered.container, 'SUBSCRIBED')).then(() => {
//       expect(find(rendered.container, SubButton)).toBeNull();
//     });
//   });
  


// });