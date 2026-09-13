import {
  ImageIcon,
} from "lucide-react";

import MediaLibrary from "../../../../components/admin/media/MediaLibrary";

import {
  getMediaItems,
} from "../../../../lib/repositories/media";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Media | PDF Office Admin",
};

export default async function AdminMediaPage() {
  const media =
    await getMediaItems();

  return (
    <div className="mx-auto max-w-[1450px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Media
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Media Library
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Upload and manage persistent PDF Office website images stored
          in Cloudinary.
        </p>
      </div>

      <MediaLibrary
        initialMedia={
          media
        }
      />
    </div>
  );
}