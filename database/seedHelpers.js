
/* Helpers for generating initial database data */

//generate a random number between 0 and max - will be used throughout helpers
var getRandomNumber = (max) => Math.floor(Math.random() * (max + 1));

//will be used to construct descriptions and comments of varying lengths.  May update with more fun text :)
var sentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Vivamus nec nisi quis sem dictum vehicula non sed ligula.',
  'Sed iaculis maximus condimentum.',
  'Curabitur placerat augue sed varius porttitor.',
  'Curabitur leo tortor, varius sed mauris ac, vulputate ultricies ipsum.',
  'Quisque at ipsum libero.',
  'Donec nec sem eu nibh facilisis rutrum vitae nec eros.',
  'In a lectus sed massa dictum volutpat!',
  'Nam mattis quam a risus imperdiet, at accumsan sem posuere.',
  'Proin pharetra ligula at dui iaculis, eget volutpat turpis congue.',
  'Cras quis leo placerat, vulputate mauris quis, sodales sapien?',
  'In hac habitasse platea dictumst.',
  'In eget libero ut mauris mattis ultrices.',
  'This video is so great and I love it so much I just want to keep watching it forever and ever!',
  'What kind of animal is that in the video?  It looks like an alligator.',
  'Who do you think you are?  How dare you.',
  'I like to watch these videos with my sister\'s bird Henry.'
];

//Combines sentences into texts of varying lengths based on argument passed.
//Also included randomness re: line breaks.  20% of the time there will be a line break early in the text; 70% later in the text.
//Line breaks may occur more than once in longer texts.
var createText = (sentenceCount, newLineCount = 2) => {
  const newLine = newLineCount === 1 ? '\n' : '\n\n';
  var text = '';
  var earlyNewLineFreq = 0.2;
  var lateNewLineFreq = 0.7;
  for (var i = 0; i < sentenceCount; i++) {
    var earlyNewLine = false;
    var lateNewLine = false;
    if ((i + 1) % 3 === 0) {
      earlyNewLine = (Math.random() < earlyNewLineFreq) ? true : false;
    }
    if ((i + 1) % 8 === 0) {
      lateNewLine = (Math.random() < lateNewLineFreq) ? true : false;
    }
    text += sentences[getRandomNumber(sentences.length - 1)] + ' ';
    if ((i + 1) < sentenceCount && (earlyNewLine === true || lateNewLine === true)) {
      text += newLine;
    }
  }
  return text;
};

//array of words that will be used to construct usernames and channel names
var words = '_ 1 2 3 4 5 6 7 8 9 A B C playa brooklyn singer baller nyc Heavenly Chuckwagon henry Sally Winston avengers hero Hiro nemo Dory bling Uptown 84 27 99 1984 user guy Gal winner chicken bully Insect King 1234 1 gary James Henrieta Mary wilson mcdonald macDaddy Cal Eva blue red Black cream'.split(' ');

//combining 3 random words (from above) to generate username or channel name
var createUserOrChannel = () => {
  var randomWord = () => getRandomNumber(words.length - 1);
  return words[randomWord()] + words[randomWord()] + words[randomWord()];
};

//array of images to be used for user profiles.  Need to add to this once I verify it works
var imageUrls = [
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1535930749574-1399327ce78f.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1518806118471-f28b20a1d79d.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1529665253569-6d01c0eaf7b6.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1530047625168-4b29bfbbe1fc.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1524607592630-66e87afd2571.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1525879000488-bff3b1c387cf.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1502764088999-001291e403de.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1528920304568-7aa06b3dda8b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1469827160215-9d29e96e72f4.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1518098268026-4e89f1a2cd8e.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1523712999610-f77fbcfc3843.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1472214103451-9374bd1c798e.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1437209484568-e63b90a34f8b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1498429089284-41f8cf3ffd39.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1496312093257-f869e5d95ce6.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1521138054413-5a47d349b7af.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1482614312710-79c1d29bda2a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1494249120761-ea1225b46c05.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1514015917727-8bba07173e47.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1499438075715-fc23ef376ab9.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1484452330304-377cdeb05340.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1523287409476-a9e70a25af3f.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1505250469679-203ad9ced0cb.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1515017804404-92b19fdfe6ac.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1521651201144-634f700b36ef.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1520541868116-c0480187f063.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1437622368342-7a3d73a34c8f.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1492534513006-37715f336a39.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1504006833117-8886a355efbf.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1517627197448-7102414540fc.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1506126944674-00c6c192e0a3.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1423958950820-4f2f1f44e075.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1453227588063-bb302b62f50b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1489924034176-2e678c29d4c6.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1500467525088-aafe28c0a95e.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1474511320723-9a56873867b5.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1493301829654-31b2d0f38fd7.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1471874276752-65e2d717604a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1452873867668-7325bd9f4438.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1477884213360-7e9d7dcc1e48.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1518717758536-85ae29035b6d.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1489440543286-a69330151c0b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1508280756091-9bdd7ef1f463.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1539078274334-d60031017381.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1518815068914-038920b6f0c6.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1447684808650-354ae64db5b8.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1512546148165-e50d714a565a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1537123547273-e59f4f437f1b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1477868433719-7c5f2731b310.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1513369720615-1516fdebbcec.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1531617494862-4e322fb560c9.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1470390356535-d19bbf47bacb.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1494256997604-768d1f608cac.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1518791841217-8f162f1e1131.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1516978101789-720eacb59e79.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1513360371669-4adf3dd7dff8.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1529257414772-1960b7bea4eb.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1517172527855-d7a4feea491b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1533743983669-94fa5c4338ec.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1516125073169-9e3ecdee83e7.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1501820488136-72669149e0d4.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1538424247885-9fbd3b5718e9.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1493406300581-484b937cdc41.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1463522689871-cb92fc985793.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1438761681033-6461ffad8d80.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1497021707778-a743a0bb2961.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1505058567159-6f2a114a1a70.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1490723286627-4b66e6b2882a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1490138139357-fc819d02e344.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1470198002244-184c9f5da03f.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1474313438662-85ce389c174a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1519838255388-73be30bda0e5.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1493863641943-9b68992a8d07.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1500363296005-e92f1f1b5052.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1443610662308-74e383d24fbe.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1513759565286-20e9c5fad06b.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1442458370899-ae20e367c5d8.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1493492473127-f5b4cafeb0b1.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1491609154219-ffd3ffafd992.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1504593811423-6dd665756598.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1498454538161-3a95cc2328df.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1494278124645-6b50f2f460ae.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1519511553349-1a39df983373.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1507902715497-d7f711f03e0a.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1515118058350-d72d92dd5140.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1533000759938-aa0ba70beceb.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1505072276982-d6c55de5d5d8.jpg',
  'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1470859624578-4bb57890378a.jpg'
];

//generates a random date between Jan 2018 and Jan 2019 (50/50 split between 2018 and 2019, so Jan 2019 will have much more activity)
var createDate = () => {
  var years = [2019, 2018];
  var year = years[getRandomNumber(years.length - 1)];
  var month = year === 2019 ? 0 : getRandomNumber(11);
  if (month === 1) {
    var day = getRandomNumber(27);
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    var day = getRandomNumber(29);
  } else {
    var day = getRandomNumber(30);
  }
  var hour = getRandomNumber(23);
  var minute = getRandomNumber(59);
  var second = getRandomNumber(59);
  var utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  return utcDate.toUTCString();
};

/* Functions that will actually create objects to seed database */

//creates array of n records (objects) containing relevant fields for users table
var createUsersData = (records) => {
  var table = [];
  //need to make sure same username isn't randomly generated twice
  var userIsInTable = (user, array) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].username === user) {
        return true;
      }
    }
    return false;
  };
  //generate a testUser that will be considered the current user interacting with the app
  table.push({
    username: 'testUser',
    image: 'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1478012237172-93bd483bb540.jpg',
    subscribers: 0
  });
  for (var i = 0; i < (records - 2); i++) {
    var user = createUserOrChannel();
    while (userIsInTable(user, table)) {
      user = createUserOrChannel();
    }
    table.push({
      username: user,
      image: imageUrls[i % imageUrls.length],
      subscribers: getRandomNumber(10000)
    });
  }
  table.push({
    username: 'The Cats and Dogs Show',
    image: 'http://node-express-env.pkkg93qppn.us-west-2.elasticbeanstalk.com/images/photo-1497042915201-daf0dd6fdc09.jpg',
    subscribers: 1000
  });
  return table;
};

//creates array of n records (objects) containing relevant fields for videos table.  id property should auto-populate in postgres, but if issues, add back id: i + 1, to table.push.
var createVideosData = (records, usernames) => {
  var table = [];
  table.push({
    id: 1,
    channel: 'The Cats and Dogs Show',
    description: 'Stumbled across this and just had to record a video.  Check out how happy he is :)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.  Vivamus nec nisi quis sem dictum vehicula non sed ligula.  Sed iaculis maximus condimentum.\n\nCurabitur placerat augue sed varius porttitor.  Curabitur leo tortor, varius sed mauris ac, vulputate ultricies ipsum.\n\nQuisque at ipsum libero.',
    publishDate: '2019-02-05T11:30:51.000Z'
  });
  for (var i = 0; i < records - 1; i++) {
    table.push({
      id: i + 2,
      channel: usernames[getRandomNumber(usernames.length - 1)],
      description: createText(getRandomNumber(35) + 1),
      publishDate: createDate()
    });
  }
  return table;
};

//creates array of n records (objects) containing relevant fields for comments table.  VideoIds and usernames included as parameter to ensure only existing videoIds/usernames are assigned to comments.
var createCommentsData = (records, videoIds, usernames, commentIds = []) => {
  var table = [];
  for (var i = 0; i < records; i++) {
    var currVideoId = videoIds[getRandomNumber(videoIds.length - 1)];
    let startSearch = getRandomNumber(commentIds.length - 1);
    let parentId = 0;
    for (let i = 0; i < commentIds.length; i++) {
      let index = (i + startSearch) % commentIds.length;
      if (Number(commentIds[index].videoId) === Number(currVideoId)) {
        parentId = commentIds[index].id;
        break;
      }
    }
    table.push({
      commentDate: createDate(),
      videoId: currVideoId,
      parentId: parentId,
      username: usernames[getRandomNumber(usernames.length - 1)],
      text: createText(getRandomNumber(6) + 1, 1),
      likes: getRandomNumber(100),
      dislikes: getRandomNumber(50)
    });
  }
  return table;
};

/* Seeds database */
var seedDb = (userSeedCount, videoSeedCount, commentSeedCount, env) => {
  var usernames;
  return env.batchInsert('users', createUsersData(userSeedCount))
    .returning('username')
    .then((username) => {
      usernames = username;
      return env.batchInsert('videos', createVideosData(videoSeedCount, usernames)).returning('id');
    })
    .then((videoIds) => {
      return env.batchInsert('comments', createCommentsData(commentSeedCount * 0.6, videoIds, usernames)).returning(['id', 'videoId']);
    })
    .then((commentIds) => {
      let videoIdHash = {};
      commentIds.forEach((comment) => { videoIdHash[comment.videoId] = true; });
      let videoIds = Object.keys(videoIdHash);
      return env.batchInsert('comments', createCommentsData(commentSeedCount * 0.4, videoIds, usernames, commentIds));
    });
};

exports.seedDb = seedDb;
