import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  viewAllLabel?: string;
  id?: string;
};

export function SectionHeading({
  title,
  href,
  viewAllLabel = "View All",
  id,
}: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2
        id={id}
        className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl"
      >
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-mm-primary hover:text-mm-primary-dark"
        >
          {viewAllLabel} ›
        </Link>
      ) : null}
    </div>
  );
}
