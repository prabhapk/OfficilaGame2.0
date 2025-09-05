import { bhutan, casinMenu, casino, casinoActiveTab, casinoTab, color, dice, digit, digitMenu, dragonvsTiger, homeActiveTab, homeTab, hot, inviteActiveTab, inviteTab, jdb, Jili, lottery1, meActiveTab, meTab, pg, quick3dMenu, quick3min, resultActiveTab, resultTab, rummy, scratch, scratchMenu, sevenUpAndDown, sportMenu, sports, teenPatti, threePatti } from "../../assets/assets";
import CasinoScreen from "../Screens/CasinoScreen";
import HomeScreen from "../Screens/HomeScreen";
import InviteScreen from "../Screens/InviteScreen";
import Profile from "../Screens/Profile";
import ResultScreen from "../Screens/ResultScreen";

export const HomeScreenFlatlist = [
    {id: 1, isSelected:true, image:casino},
    {id: 2, isSelected:false, image:lottery1},
    {id:3, isSelected:false, image:scratch},
    {id:4, isSelected:false, image:rummy},
    {id:5, isSelected:false, image:sports}
]

export const CasionHeadersList = [
    {id: 1, name:"Hot", image:hot},
    {id: 2, name:"PG", image:pg},
    {id:3, name:"JILI", image:Jili},
    {id:4, name:"JDB", image:jdb}
]

export const CasionGamesList = [
    {id: 1, name:"DragonvsTiger", image:dragonvsTiger},
    {id: 2, name:"Three patti", image:threePatti},
    {id:3, name:"Teenpatti", image:teenPatti},
    {id:4, name:"7 Up & Down", image:sevenUpAndDown}
]

export const lotteryGamesList = [
    {id: 1, name:"color", image:color},
    {id: 2, name:"dice", image:dice},
    {id:3, name:"3digit", image:digit}
]

 export const ThreeDigits = [
    {
      win_price: '10,000',
      price: '11.00',
      title: 'Quick 3D 1min',
      ends_On: "2025-07-22T15:58:27.123Z",
      bgImage:quick3min,
      gameTye:"Custom",
      id:"1minGame"
    },
       {
      win_price: '10,000',
      price: '11.00',
      title: 'Quick 3D 3min',
      ends_On: "2025-07-22T23:52:27.123Z",
      bgImage:quick3min,
       gameTye:"Custom",
      id:"3minGame"
    },
       {
      win_price: '10,000',
      price: '11.00',
      title: 'Quick 3D 5min',
      ends_On: "2025-07-22T23:58:27.123Z",
      bgImage:quick3min,
       gameTye:"Custom",
      id:"5minGame"
    },
    {
      win_price: '30,000',
      price: '11.00',
      title: 'Bhutan Jackpot',
      ends_On: "2025-07-03T18:42:27.123Z",
      bgImage:bhutan,
       gameTye:"RealGame",
      id:"real"
    },
    // {win_price: '25,000', price: '11.00', title: 'Skywin', ends_On: targetDate,  bgImage:skywin,
    //    gameTye:"RealGame",
    //   id:"real"},
    // {
    //   win_price: '30,000',
    //   price: '11.00',
    //   title: 'Chennai lottery',
    //   ends_On: targetDate,
    //   bgImage:chennaiLottery,
    //    gameTye:"RealGame",
    //   id:"real"
    // },
    // {
    //   win_price: '10,000',
    //   price: '11.00',
    //   title: 'Quick 3D 5min',
    //   ends_On: targetDate,
    //   bgImage:Quick3DImage,
    //    gameTye:"RealGame",
    //   id:"real"
    // },
    // {win_price: '15,000', price: '11.00', title: 'Lucwin', ends_On: targetDate,  bgImage:LucwinImage},
    // {
    //   win_price: '50,000',
    //   price: '11.00',
    //   title: 'Kubeer lottery',
    //   ends_On: targetDate,
    //   bgImage:KubberLotteryImage
    // },
    // {
    //   win_price: '15,000',
    //   price: '11.00',
    //   title: 'Dear lottery',
    //   ends_On: targetDate,
    //   bgImage:DearLotteryImage
    // },
    // {
    //   win_price: '15,000',
    //   price: '11.00',
    //   title: 'Kerala lottery',
    //   ends_On: targetDate,
    //   bgImage:KeralaLotteryImage
    // },
  ];

  export const MenuBarList = [
    {id: 1, name:"Quick 3D", image:quick3dMenu},
    {id: 2, name:"Official 3 Digits", image:digitMenu},
    {id:3, name:"Casino", image:casinMenu},
    {id:4, name:"Scratch", image:scratchMenu},
    {id:5, name:"Sport", image:sportMenu}
  ]

  export const tabScreens = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    focusedIcon: homeActiveTab,
    unfocusedIcon: homeTab,
  },
  {
    name: 'Casino',
    component: CasinoScreen,
    label: 'Casino',
    focusedIcon:casinoActiveTab,
    unfocusedIcon: casinoTab,
  },
   {
    name: 'Result',
    component: ResultScreen,
    label: 'Result',
    focusedIcon: resultActiveTab,
    unfocusedIcon: resultTab,
  },
  {
    name: 'Invite',
    component: InviteScreen,
    label: 'Invite',
    focusedIcon: inviteActiveTab,
    unfocusedIcon: inviteTab,
  },
   {
    name: 'Me',
    component: Profile,
    label: 'Me',
    focusedIcon: meActiveTab,
    unfocusedIcon: meTab,
  },
];

export const resultHeaderList = [
  {id:1, name:'All'},
  {id: 2, name: '3Digits'},
  {id: 3, name: 'State Lottery'},
  {id: 4, name: 'Kerala'},
  {id: 5, name: 'Matka'},
  {id: 6, name: 'Quick 3 Digits'},
  {id: 7, name: 'Color'},
  {id: 8, name: 'Dice'},
]
export const resultFilterList = [
  {id: 1, name: 'All'},
  {id: 2, name: 'Dear Lottery'},
  {id: 3, name: 'Kerala Lottery'},
  {id: 4, name: 'LuckyDraw'},
  {id: 5, name: 'Quick 3 Digits'},
  {id: 6, name: 'Golden Treasure'},
  {id: 7, name: 'Dice'},
]

export const resultTableData = [
  {
    "3Digits": [
      {
        id: 1,
        name: '222222222',
        time: '08:15:00 PM',
        balls: ['4', '5', '5'],
      },
      {
        id: 2,
        name: '222222223',
        time: '08:16:00 PM',
        balls: ['5', '1', '0'],
      },
      {
        id: 3,
        name: '222222224',
        time: '08:17:00 PM',
        balls: ['5', '5', '5'],
      },
      {
        id: 4,
        name: '222222225',
        time: '08:18:00 PM',
        balls: ['2', '0', '1'],
      },
      {
        id: 5,
        name: '222222226',
        time: '08:19:00 PM',
        balls: ['5', '2', '0'],
      },
      {
        id: 6,
        name: '222222227',
        time: '08:20:00 PM',
        balls: ['5', '5', '0'],
      },
    ],
    "State Lottery": [
      {
        id: 7,
        name: '222222228',
        time: '08:21:00 PM',
        balls: ['5', '5', '1'],
      },
      {
        id: 8,
        name: '222222229',
        time: '08:22:00 PM',
        balls: ['5', '4', '5'],
      },
      {
        id: 9,
        name: '222222230',
        time: '08:23:00 PM',
        balls: ['1', '3', '0'],
      },
      {
        id: 10,
        name: '222222231',
        time: '08:24:00 PM',
        balls: ['1', '2', '3'],
      },
    ],
    "Kerala": [
      {
        id: 11,
        name: '222222222',
        time: '08:15:00 PM',
        balls: ['1', '1', '1'],
      },
      {
        id: 12,
        name: '222222223',
        time: '08:16:00 PM',
        balls: ['5', '1', '0'],
      },
      {
        id: 13,
        name: '222222224',
        time: '08:17:00 PM',
        balls: ['5', '5', '5'],
      },
      {
        id: 14,
        name: '222222225',
        time: '08:18:00 PM',
        balls: ['2', '0', '1'],
      },
      {
        id: 15,
        name: '222222226',
        time: '08:19:00 PM',
        balls: ['5', '2', '0'],
      },
      {
        id: 16,
        name: '222222227',
        time: '08:20:00 PM',
        balls: ['5', '5', '0'],
      },],
      "Matka": [
      {
        id: 17,
        name: '222222228',
        time: '08:21:00 PM',
        balls: ['5', '5', '1'],
      },
      {
        id: 18,
        name: '222222229',
        time: '08:22:00 PM',
        balls: ['5', '4', '5'],
      },
      {
        id: 19,
        name: '222222230',
        time: '08:23:00 PM',
        balls: ['1', '3', '0'],
      },
      {
        id: 20,
        name: '222222231',
        time: '08:24:00 PM',
        balls: ['1', '2', '3'],
      },
      {
        id: 21,
        name: '222222231',
        time: '08:24:00 PM',
        balls: ['1', '1', '8'],
      }
    ]
  }
];

export const myBetsHeaderList = [
  {id: 1, name: '3 digits'},
  {id: 2, name: 'Dear Lottery'},
  {id: 3, name: 'Kerala Lottery'},
  {id: 4, name: 'LuckyDraw'},
  {id: 5, name: 'Quick 3 Digits'},
  {id: 6, name: 'Golden Treasure'},
  {id: 7, name: 'Dice'},
]

export const myBetsFilterList = [
  {id: 1, name: 'All'},
  {id: 2, name: 'To be Drawn'},
  {id: 3, name: 'Drawn'},
  {id: 4, name: 'Won'},
]

export const myBetsTableData = [{
  type: "A",
  time: "01-08-2022 12:00 PM",
  payment: "₹ 33",
  bettingTime: "01-08-2022 12:00 PM",
  result: "WON ₹ 100",
  id: "PK56283947",
  value:"2"
},
{
  type: "B",
  time: "01-08-2022 12:00 PM",
  payment: "₹ 33",
  bettingTime: "01-08-2022 12:00 PM",
  result: "NO WON",
  id: "PK56283947",
  value:"3"
},
{
  type: "C",
  time: "01-08-2022 12:00 PM",
  payment: "₹ 33",
  bettingTime: "01-08-2022 12:00 PM",
  result: "NO WON",
  id: "PK56283947",
  value:"4"
}
]