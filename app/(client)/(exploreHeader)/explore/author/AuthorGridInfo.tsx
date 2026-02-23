import Image from "next/image";
import Link from "next/link";

interface AuthorGridDetailProps {
  name: string;
  id: number;
  profile?: string;
}

const AuthorGridDetail = ({ name, id, profile }: AuthorGridDetailProps) => {
  return (
    <div className="relative flex size-full justify-between">
      <div className="relative flex h-9 gap-1.5">
        {profile ? (
          <Image src={profile || ""} alt={""} fill className="w-9" />
        ) : (
          <div className="size-full bg-gray-200"></div>
        )}
        <p className="font-semibold">{name}</p>
        <Link
          className="rounded-[50px] border border-[#EDEDED] px-3 py-2 text-[--sub-color]"
          href={`/author/${id}`}
        >
          프로필 보기
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default AuthorGridDetail;
