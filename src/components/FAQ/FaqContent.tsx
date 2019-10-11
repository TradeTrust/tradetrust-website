import React from "react";
import styles from "./faq.scss";
import content from "./FaqContent.json";

export const FaqContent = () => (
  <div className={styles.main}>
    <div className={styles["header-container"]}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
    </div>
    {content.map(({ category, faq = [] }, indexContent) => (
      <div className={styles["content-container"]} key={indexContent}>
        <h4>{category}</h4>
        {faq.map(({ question, answer }, indexFaq) => (
          <div className={styles["content-container"]} key={indexFaq}>
            <a className={styles.question}>
              <h5>{question}</h5>
            </a>
            <div>
              <div className={styles.answer}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
