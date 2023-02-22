import { Image, Link, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Code from "./Code";
import { useRouter } from "next/router";

export const RenderBlocks = ({ blocks }) => {

  //for hydration error
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);

  return blocks.map((block) => {
    const { type, id } = block;
    const value = block[type];
    //    console.log("BLOCK = ", block)
    //    console.log("TYPE = ",type)
    //    console.log("VALUE = ",value)

    //for hydration
    if (loading) {
      return <div>Loading</div>;
    }

    switch (type) {
      case "divider":
        return <hr className="w-full border" key={id} />;

      case "paragraph":
        return <ParaText text={value.rich_text} id={id} key={id} />;

      case "heading_1":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "heading_2":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "heading_3":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "quote":
        return (
          <blockquote key={id} className="pl-4 border-l-2 border-l-black">
            <SpanText id={id} text={value.rich_text} />
          </blockquote>
        );

      case "bulleted_list_item":
      case "numbered_list_item":
        return <ListItem key={id} value={value} id={id} />;

      case "code":
        const code = value.rich_text[0]?.plain_text || "";
        return (
          <Code key={id} language={value.language}>
            {code}
          </Code>
        );
      case "to_do":
        return <ToDo key={id} value={value} />;

      case "toggle":
        return <Toggle key={id} value={value} />;

      case "image":
        const imageSrc =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption.length ? value.caption[0].plain_text : "";
        return (
          <figure key={id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image alt={caption} src={imageSrc} borderRadius="lg" my="2"  />
            {caption && <figcaption className="mt-2">{caption}</figcaption>}
          </figure>
        );

      default:
        return `Unsupported block (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
    }
  });
};

const SpanText = ({ text, id }) => {
  if (!text) return null;

  return text.map((value, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    console.log(bold, code, color, italic, strikethrough, underline);
    return (
      <Text
        key={id + i}
        display="inline"
        fontWeight={bold ? "bold" : ""}
        fontFamily={code ? "mono" : ""}
        fontStyle={italic ? "italic" : ""}
        bgColor={code ? "gray.100" : ""}
        fontSize={code ? "sm" : ""}
        rounded={code ? "md" : ""}
        textDecoration={
          strikethrough ? "line-through" : underline ? "underline" : ""
        }
        lineHeight="2"
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <Link
            href={text.link.url}
            className="underline"
            color="blue.600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.content}
          </Link>
        ) : (
          text.content
        )}
      </Text>
    );
  });
};

const ParaText = ({ text, id }) => {
  const textColor = useColorModeValue("gray.700","white")
  return (
    <Text color={textColor}>
      <SpanText text={text} id={id} />
    </Text>
  );
};

const ListItem = ({ value, id }) => {
  return (
    <li>
      <SpanText text={value.rich_text} id={id} />
    </li>
  );
};

const Heading = ({ text, level }) => {
  switch (level) {
    case "heading_1":
      return (
        //<h1 className="my-2 text-3xl font-bold tracking-tight text-black md:text-5xl">
        //  <SpanText text={text} />
        //</h1>
        <Text fontSize="3xl" fontWeight="bold" marginY="2">
          <SpanText text={text} />
        </Text>
      );
    case "heading_2":
      return (
        //<h2 className="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
        //  <SpanText text={text} />
        //</h2>
        <Text fontSize="2xl" fontWeight="bold" marginY="2">
          <SpanText text={text} />
        </Text>
      );
    case "heading_3":
      return (
        // <h3 className="my-2 text-lg font-bold tracking-tight text-black md:text-xl">
        //   <SpanText text={text} />
        // </h3>
        <Text fontSize="large" fontWeight="bold" marginY="2">
          <SpanText text={text} />
        </Text>
      );
    default:
      return null;
  }
};

const ToDo = ({ id, value }) => {
  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
        <SpanText text={value.rich_text} />
      </label>
    </div>
  );
};

const Toggle = ({ value }) => {
  return (
    <details>
      <summary className="cursor-pointer">
        {value.rich_text[0].text.content}
      </summary>
      {value.children?.map((block) => {
        if (block.type === "paragraph") {
          return (
            <Text
              key={block.id}
              text={block.paragraph.rich_text}
              id={block.id}
            />
          );
        }
      })}
    </details>
  );
};
