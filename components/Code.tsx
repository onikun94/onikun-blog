import React, { useEffect } from "react";
import Prism from "prismjs";
import { Box } from "@chakra-ui/react";

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'

const Code = ({ children, language }) => {
  console.log("CHILDREN = ", children)
  useEffect(() => {
    console.log("Prism is called");
    console.log("language lower", typeof language.toLowerCase());
    Prism.highlightAll();
  }, []);
  return (
      //<Box overflow="auto" position="relative"  p="4" bgColor="gray" borderRadius="md">
       
      <pre>  
        <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            children,
            Prism.languages[language] || Prism.languages['markdown'],
            language
          ),
        }}
      />
      <style jsx>{`
        code {
          vertical-align: middle;
          white-space: pre;
          word-break: break-all;
          max-width: 100%;
          display: block;
          font-size: 0.8rem;
          line-height: 1.4;
          padding: 1.25rem 1.5rem;
          margin: 0.85rem 0;
          background-color: #282c34;
          color: #ccc;
          border-radius: 6px;
          overflow: auto;
        }
      `}</style>
    </pre>
    //</Box>
  );
};

export default Code
