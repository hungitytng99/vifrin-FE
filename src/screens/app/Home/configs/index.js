import Images from "./images";

const CONTROL_LIST = [
  {
    title: "Report",
    isHighLight: true,
  },
  {
    title: "Unfollow",
    isHighLight: true,
  },
  {
    title: "Go to post",
    isHighLight: false,
  },
  {
    title: "Share to ...",
    isHighLight: false,
  },
  {
    title: "Copy Link",
    isHighLight: false,
  },
  {
    title: "Embed",
    isHighLight: false,
  },
  {
    title: "Cancel",
    isHighLight: false,
  },
];

// Login
const SUCCESS_LOGIN_RESPONSE = {
  token: "mytoken~!!!!",
  username: "hung.it99",
};

const FOLLOW_API = [
  {
    avatar: Images.AVA_1,
    username: "hungitytng99",
    description: "Follows you",
  },
  {
    avatar: Images.AVA_2,
    username: "hungitytng98",
    description: "Follows you",
  },
  {
    avatar: Images.AVA_3,
    username: "hungitytng97",
    description: "Follows you",
  },
  {
    avatar: Images.AVA_4,
    username: "hungitytng96",
    description: "Followed by anhplaydan + 1 more",
  },
  {
    avatar: Images.AVA_5,
    username: "hungitytng95",
    description: "Followed by 0212.mco____ + 2 more",
  },
];
const MAIN_USER = {
  avatar: Images.AVA_6,
  username: "hung.it99",
  description: "Mạnh Hùng",
};

const LIST_COMMENT = [
  {
    id: 1,
    user: "hung.it99",
    avatar: Images.AVA_7,
    linkToUserPage: "#",
    comment: "This is a beautiful picture",
    reply: [],
    liked: 0,
    isLiked: false,
    dateCreated: "12w",
  },
  {
    id: 2,
    user: "tta.99",
    avatar: Images.AVA_8,
    linkToUserPage: "#",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    reply: [],
    liked: 12,
    isLiked: false,
    dateCreated: "2w",
  },
  {
    id: 3,
    user: "puuu.puuu",
    avatar: Images.AVA_9,
    linkToUserPage: "#",
    comment: "It is a long established",
    reply: [],
    liked: 15,
    isLiked: true,
    dateCreated: "10w",
  },
];

const POSTS = [
  {
    id: 1,
    user: "tmh",
    linkToUserPage: "#",
    avatar: Images.AVA_10,
    location: "Địa Trung Hải-Sun Premier Village Primavera",
    img_list: [
      Images.POST_11,
      Images.POST_12,
      Images.POST_13,
      Images.POST_14,
      Images.POST_15,
    ],
    liked: 70211,
    status: "There are many variations of passages",
    comment: "",
    dateCreated: "February 20",
    isLikedProps: true,
    isFavouriteProps: false,
  },
  {
    id: 2,
    user: "dochet1989",
    linkToUserPage: "#",
    avatar: Images.AVA_11,
    location: "Địa Trung Hải-Sun Premier Village Primavera",
    img_list: [
      Images.POST_21,
      Images.POST_22,
      Images.POST_23,
      Images.POST_24,
      Images.POST_25,
    ],
    liked: 70211,
    status:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    comment: "",
    dateCreated: "February 17",
    isLikedProps: false,
    isFavouriteProps: true,
  },
  {
    id: 3,
    user: "ngoctrinh89",
    linkToUserPage: "#",
    avatar: Images.AVA_1,
    location: "Địa Trung Hải-Sun Premier Village Primavera",
    img_list: [Images.POST_31, Images.POST_32, Images.POST_33, Images.POST_34],
    liked: 33333,
    status:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    comment: LIST_COMMENT,
    dateCreated: "February 17",
    isLikedProps: false,
    isFavouriteProps: false,
  },
  {
    id: 4,
    user: "tta",
    linkToUserPage: "#",
    avatar: Images.AVA_2,
    location: "Địa Trung Hải-Sun Premier Village Primavera",
    img_list: [Images.POST_41, Images.POST_42, Images.POST_43, Images.POST_44],
    liked: 22222,
    status:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    comment: LIST_COMMENT,
    dateCreated: "February 17",
    isLikedProps: false,
    isFavouriteProps: false,
  },
  {
    id: 5,
    user: "lingglanhh",
    linkToUserPage: "#",
    avatar: Images.AVA_5,
    location: "",
    img_list: [Images.POST_51, Images.POST_52, Images.POST_53, Images.POST_54],
    liked: 99999,
    status:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    comment: LIST_COMMENT,
    dateCreated: "February 17",
    isLikedProps: false,
    isFavouriteProps: false,
  },
  {
    id: 6,
    user: "ngocdao",
    linkToUserPage: "#",
    avatar: Images.AVA_6,
    location: "Địa Trung Hải-Sun Premier Village Primavera",
    img_list: [Images.POST_51, Images.POST_52, Images.POST_53, Images.POST_54],
    liked: 101111,
    status: "Nhìn kỹ là thiên thần.",
    comment: "",
    dateCreated: "February 17",
    isLikedProps: false,
    isFavouriteProps: false,
  },
];
const PRIVATE_POST = {
  Comment: {
    352118598881683: {
      version: 1,
      href: "",
      data: {
        content: "",
      },
    },
  },
  Attachment: {
    432423423423442: {
      version: 1,
      href: "",
      data: {
        userId: "",
        url: "",
        name: "",
        mime: "",
        size: 122342,
      },
    },
  },
  HasSeen: {
    140737488419056: {
      href: "",
      minScore: "1612421634628",
      maxScore: "1612421634628",
      total: 1,
      itemIds: ["70506183519470"],
    },
  },
  Post: {
    140737488419056: {
      version: 1,
      href: "",
      data: {
        caption: "hello",
        longitude: "423432432",
        latitude: "70506183431280",
      },
    },
  },
  HasAttachment: {
    70437463720459: {
      href: "",
      minScore: 1612422235848,
      maxScore: 1612422235848,
      total: 1,
      itemIds: ["432423423423442"],
    },
  },
  HasPost: {
    70437463720459: {
      href: "",
      minScore: 1612422235848,
      maxScore: 1612422235848,
      total: 1,
      itemIds: ["140737488419056"],
    },
  },
  HasComment: {
    140737488419056: {
      href: "",
      minScore: 1612421622876,
      maxScore: 1612422235525,
      total: 1,
      itemIds: ["352118598881683"],
    },
  },
  avatar:
    "https://instagram.fhan2-3.fna.fbcdn.net/v/t51.2885-19/s150x150/127365855_806397036596310_8906347670844691912_n.jpg?tp=1&_nc_ht=instagram.fhan2-3.fna.fbcdn.net&_nc_ohc=EG5NcKidGDYAX-b5YCS&edm=ABfd0MgAAAAA&ccb=7-4&oh=11cd7e9f9f648d06bfdcc10115321702&oe=60986FFC&_nc_sid=7bff83",
};
export {
  PRIVATE_POST,
  SUCCESS_LOGIN_RESPONSE,
  MAIN_USER,
  FOLLOW_API,
  LIST_COMMENT,
  POSTS,
  CONTROL_LIST,
};
