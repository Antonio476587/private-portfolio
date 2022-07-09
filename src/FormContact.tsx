import React, { useState, useEffect } from "react";

import { envelope, cloudArrowD, send, envelopeOpen } from "./Svg.jsx";
import TextInput from "./TextInput.jsx";

function ContactForm({ active }) {
  const [nameMessage, setNameMessage] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("Error");
  const [toastContent, setToastContent] = useState("Si");
  const [showingValidation, setShowingValidation] = useState("");
  const [giveNFT, setGiveNFT] = useState("nft-gift-desactive");
  const [clear, setClear] = useState(false);

  function showError(e) {
    setShowingValidation("denied-toast");
    setToastTitle("Error");
    setToastContent(e);
    setTimeout(() => {
      setShowingValidation("");
    }, 2000);
  }

  async function fetchMessage(data) {

    try {
      const headers = { "Content-Type": "application/json" };

      const response = await fetch("/messages", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const body = await response.text();
      /*       const result = JSON.parse(body); */
      return body;
    } catch (e) {
      return showError();
    }
  }

  function UpperChange(e, naturalValue) {
    const { name, value: textValue } = e.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    if (name == "name") setNameMessage(value);
    if (name == "email") setEmail(value);
    if (name == "message") setMessage(value);

  }

  function showValidation(data) {
    setShowingValidation("success-toast");
    setToastTitle("Success");
    setToastContent(data);
    setGiveNFT("nft-gift-active");
    setClear(true);

    setTimeout(() => {
      setShowingValidation("");
      setClear(false);
    }, 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (nameMessage.length <= 3) {
      showError("You must fill all the fields to send the message.");
      return;
    } else if (email.length <= 3) {
      showError("You must fill all the fields to send the message.");
      return;
    } else if (message.length <= 3) {
      showError("You must fill all the fields to send the message.");
      return;
    }

    const created = new Date();

    const newMessage = {
      nameMessage,
      email,
      message,
      date: created,
    };

    const data = await fetchMessage(newMessage);

    if (data) {
      showValidation(data);
    }

  }

  return (
    <div className="contact-body-div">
      <div className={`toast-contact ${showingValidation}`}>
        <h5>{toastTitle}</h5>
        <p>{toastContent}</p>
      </div>

      <div className="contact-nft-gift">
        <div className={`div-nft-gift ${giveNFT}`} tabIndex="0">
          <div className="div-nft-gift-hover-1" />
          <div className="div-nft-gift-hover-2" />
          {giveNFT === "nft-gift-desactive" ? null : (
            <img src="/img/1.png" alt="" className="nft" />
          )}
        </div>
        {giveNFT === "nft-gift-desactive" ? (
          <button
            type="button"
            title="button to download the NFT"
            aria-disabled={active}
          >
            {cloudArrowD}
          </button>
        ) : (
          <a href="/img/1.png" download="">
            <button
              type="button"
              title="button to download the NFT"
              aria-disabled={active}
            >
              {cloudArrowD}
            </button>
          </a>
        )}
      </div>

      <div className="contact-div-form">
        <div className="contact-sub-div-form">
          <form action="" className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-input-name-div">
              <TextInput
                type="text"
                name="name"
                id="name"
                UpperChange={UpperChange}
                value={nameMessage}
                key="name"
                placeholder="Name or enterprise name"
                Clear={clear}
              />
            </div>
            <div className="contact-input-email-div">
              <TextInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                key="email"
                value={email}
                UpperChange={UpperChange}
                Clear={clear}
              />
            </div>
            <div className="contact-input-message-div">
              <TextInput
                name="message"
                id="message"
                key="Message"
                placeholder="If you send me a message, I'll give you a NFT.
Note: It's not the original NFT."
                tag="textarea"
                rows="5"
                value={message}
                UpperChange={UpperChange}
                Clear={clear}
              />
            </div>
            <div className="contact-button-submit-div">
              <button type="submit" title="send-form" aria-disabled={active}>
                {send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function FormContact() {
  const [active, setActive] = useState(false);

  function formControl() {
    const form = document.querySelector(".contact-body-div");
    form.classList.toggle("contact-body-active");
    setActive(!active);
  }

  return (
    <div className="contact-body">
      <button
        id="envelope-button"
        className="contact-body-button"
        type="button"
        onClick={formControl}
      >
        {!active ? envelope : envelopeOpen}
      </button>
      <ContactForm active={active} />
    </div>
  );
}
