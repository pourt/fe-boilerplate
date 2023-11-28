export const abn = /^\d{2}\s\d{3}\s\d{3}\s\d{3}$/;

export const acn = /^\d{3}\s\d{3}\s\d{3}$/;

export const alphabet = /^[aA-zZ\-\s]+$/;

export const alphaNumeric = /^[a-zA-Z0-9]+$/;

export const numeric = /^\d*\.?\d*$/;

export const float = /^(?!0\d)\d*(\.\d+)?$/;

export const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+.-])(?=^[^~`=[\]\\';,{}|\\":<>?]*$)(?=.{8,})/;

export const phone = {
  generic: /^\+{0,1}\s*(?:[\w.]\s*){10,15}$/,
  aus: /^\d{2}\s\d{4}\s\d{4}$/,
  php: /^\d{3}\s\d{3}\s\d{4}$/,
};

export const mobile = {
  generic: /^\+{0,1}\s*(?:[\w.]\s*){10,15}$/,
  aus: /^\d{4}\s\d{3}\s\d{3}$/,
  php: /^\+63\s\d{3}\s\d{3}\s\d{4}$/,
};

export const postalCode = {
  aus: /^\d{4}$/,
  php: /^\d{4}$/,
};

export const url =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const longUrl =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_,!+.~#?&//=]*)/;

export const website = /^[a-z0-9]+([.]{1}[a-z0-9]+)*.[a-z]{2,6}$/i;

export const voip = /^\d{10,15}$/;

export default {
  abn,
  acn,
  alphabet,
  alphaNumeric,
  numeric,
  email,
  password,
  phone,
  mobile,
  postalCode,
  url,
  longUrl,
  voip,
  float,
  website,
};
