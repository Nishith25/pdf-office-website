function renderBlock(
  block:
    string,

  index:
    number,
) {
  const value =
    block.trim();

  if (!value) {
    return null;
  }

  if (
    value.startsWith(
      "### ",
    )
  ) {
    return (
      <h3
        key={
          index
        }
      >
        {
          value.slice(
            4,
          )
        }
      </h3>
    );
  }

  if (
    value.startsWith(
      "## ",
    )
  ) {
    return (
      <h2
        key={
          index
        }
      >
        {
          value.slice(
            3,
          )
        }
      </h2>
    );
  }

  const lines =
    value.split(
      "\n",
    );

  if (
    lines.every(
      (
        line,
      ) =>
        line.trim()
          .startsWith(
            "- ",
          ),
    )
  ) {
    return (
      <ul
        key={
          index
        }
      >
        {lines.map(
          (
            line,
          ) => (
            <li
              key={
                line
              }
            >
              {
                line
                  .trim()
                  .slice(
                    2,
                  )
              }
            </li>
          ),
        )}
      </ul>
    );
  }

  return (
    <p
      key={
        index
      }
    >
      {
        lines.map(
          (
            line,
            lineIndex,
          ) => (
            <span
              key={`${index}-${lineIndex}`}
            >
              {
                line
              }

              {lineIndex <
                lines.length -
                  1 && (
                <br />
              )}
            </span>
          ),
        )
      }
    </p>
  );
}

export default function BlogArticleBody({
  body,
}: {
  body:
    string;
}) {
  return (
    <div className="gps-blog-prose">
      {
        body
          .split(
            /\n{2,}/,
          )
          .map(
            renderBlock,
          )
      }
    </div>
  );
}
