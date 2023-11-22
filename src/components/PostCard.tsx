import Link from "next/link";

import { getDateByString } from "@/utils/utils";

export default function PostCard({ data, userName }: any) {
  const { date } = getDateByString(data.date);

  return (
    <div className="p-5 border-t border-neutral-content hover:bg-base-200">
      <Link href={`/post/${data.id}`}>
        <p className="text-2xl font-bold text-base-content">{data.title}</p>
        <p className="text-lg text-base-content">
          {data.content.length > 40
            ? `${data.content.substring(0, 40)} ...`
            : data.content}
        </p>
        <p className="text-lg text-slate-500">{`${userName} · ${date}`}</p>
      </Link>
    </div>
  );
}
