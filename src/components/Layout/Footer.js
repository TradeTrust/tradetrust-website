import React from "react";
import css from "./footer.scss";

const Footer = () => (
  <footer className={`bg-brand-navy ${css.footer}`}>
    <div className={css["footer-content"]}>
      <a href="https://github.com/TradeTrust">Github</a>
    </div>
  </footer>
);

export default Footer;
