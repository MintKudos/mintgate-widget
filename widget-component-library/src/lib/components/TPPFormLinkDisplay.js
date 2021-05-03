import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
} from "react-share";

// const cheerio = require("cheerio");

export default function tpplink() {
  // const [state, setState] = useState({});
  const [link, setLink] = useState("");
  const [rellink, setRelLink] = useState("");
  const handleFocus = (event) => event.target.select();

  const [copyNoticeOpen, setCopyNoticeOpen] = useState(false);

  return (
    <>
     <div>{input}</div>
    </>
  );
}