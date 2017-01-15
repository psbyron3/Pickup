const path = require('path');
const Sequelize = require('sequelize');
const env = 'development';
const config = require('./dbConfig.js')[env];

const sequelize = new Sequelize(config.database, config.user, config.password, config.connection);
console.log("Config VARS ::: ", config);
sequelize
  .authenticate()
  .then(() => {
    console.log("DB has successfully connected");
  })
  .catch(() => {
    console.log("DB could not authenticate");
  });
//****************************************//  
//*************USER SCHEMA****************//
//****************************************//
const Users = sequelize.define('Users', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {
        msg: 'must be a valid email'
      },
    },
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  userPic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid url'
      },
    },
  },
  avgRating:{
    type: Sequelize.DECIMAL(5, 4),
  },
});

//*******************************************//
//************* EVENTS SCHEMA ***************//
//*******************************************//
const Events = sequelize.define('Events', {
  eventName : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sport : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventPic : {
    type: Sequelize.STRING,
    // validate: {
    //   isUrl: {
    //     msg: 'eventPic must be a valid url',
    //   },
    // },
  },
  description: {
    type: Sequelize.STRING,
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
  },
  playersNeeded: {
    type: Sequelize.INTEGER
  },
  attending: {
    type: Sequelize.INTEGER,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.DECIMAL(10, 7),
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DECIMAL(10, 7),
    allowNull: false,
  },
  gameStart: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  gameEnd: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

//*****************************************//
//************* REVIEW SCHEMA *************//
//*****************************************//

const Reviews = sequelize.define('Reviews', {
  content: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1,
    },
  },
});

//********************************************//
//************ USER/EVENTS JOIN SCHEMA *******//
//********************************************//

const UsersEvents = sequelize.define('UsersEvents', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  eventId: {
    type: Sequelize.INTEGER,
  },
  role: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['guest', 'host']],
    },
  },
  wasReviewed: {
    type: Sequelize.BOOLEAN
  }
});

//*************************************************//
//**************** MESSAGE SCHEMA *****************//
//*************************************************//

const Messages = sequelize.define('Messages', {
  content: {
    type: Sequelize.STRING,
  },
  userName: {
    type: Sequelize.STRING,
  }
});

//------------- MANY TO MANY RELATIONSHIPS ----------//
// -- JOIN TABLES: UsersEvents

Users.belongsToMany(Events, {through: 'UsersEvents', foreignKey: 'userId' });
Events.belongsToMany(Users, {through: 'UsersEvents', foreignKey: 'eventId' });

// <<<<<<<<<<<<<< ONE TO MANY RELATIONSHIPS >>>>>>>>>>>>>>>> 
// One in many TABLES (1:many): 
//   events:reviews, users:reviews

Reviews.belongsTo(Events, { as: 'event', foreignKey: 'eventId'});
Events.hasMany(Reviews, { foreignKey: 'eventId' });

sequelize
  .sync({force: true})
  .then(() => {
    console.log("Tables created successfully from Schema");
  });

exports.Users = Users;
exports.Events = Events;
exports.Reviews = Reviews;
exports.UsersEvents = UsersEvents;
exports.Messages = Messages;




