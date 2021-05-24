import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Maulik Pipaliya (Admin)",
    bio: "Admin",
    email: "maulik.pipaliya@gmail.com",
    contact: "8460146679",
    password: bcrypt.hashSync('maulik'),
    address: {
      location: "Patel Park",
      pincode: "394520",
      city: "Surat",
      state: "Gujarat",
    },
    isAdmin: true,
  },
  {
    name: "Pradip Chandpara",
    bio: "Owner",
    email: "pradip.chandpara332@gmail.com",
    contact: "8758796838",
    password: bcrypt.hashSync("pradip"),
    address: {
      location: "404, Sankalp Residency Wing G, Opp. Sai Row House",
      landmark: "Sayan Road",
      pincode: "394107",
      city: "Surat",
      state: "Gujarat",
    },
  },
  {
    name: "Vipul Chauhan",
    bio: "Customer",
    email: "chauhanvipul530@gmail.com",
    contact: "8530212611",
    password: bcrypt.hashSync("vipul"),
    address: {
      location: "Bhavnagar",
      landmark: "Nari Chowkdi",
      pincode: "364004",
      city: "Bhavnagar",
      state: "Gujarat",
    },
  },
];
export default users;
