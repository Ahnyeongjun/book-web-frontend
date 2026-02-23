import { AuthorDto } from "@/types/dto";
import Authorbook from "./AuthorGridbook";
import AuthorGridDetail from "./AuthorGridInfo";

interface AuthorGridProps {
  authorData: AuthorDto;
}

const AuthorGrid = ({ authorData }: AuthorGridProps) => {
  return (
    <div className="flex size-full flex-col">
      <AuthorGridDetail
        name={authorData.name}
        id={authorData.id}
        profile={authorData.profile}
      />
      <div className="flex size-full">
        {authorData.bookList.map((book) => (
          <div
            key={book.isbn}
            className="relative flex size-full h-[158px] items-center gap-1"
          >
            {book.titleImage ? (
              <Authorbook imageUrl={book.titleImage} title={""} />
            ) : (
              <div className="h-48 w-32 bg-gray-200"></div>
            )}

            <p className="text-sm">{book.title}</p>
          </div>
        ))}
      </div>
      {authorData.id}
    </div>
  );
};

export default AuthorGrid;
