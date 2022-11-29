import React, { useEffect } from "react";
import Prism  from "prismjs";

export const Code = ({ children, language }) => {
  console.log("CHILDREN = ",children)
  useEffect(() => {
    console.log("Prism is called");
    console.log("language lower",typeof language.toLowerCase())
    Prism.highlightAll();
  }, []);
  return (
    <>
      <pre className={`language-javascript`}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children || "",
              Prism.languages[language] || Prism.languages['markdown'],
              language
            ),
          }}
        />
      </pre>
    </>
  );
};
