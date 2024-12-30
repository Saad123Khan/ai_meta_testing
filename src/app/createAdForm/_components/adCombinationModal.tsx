import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdCombinationCard from "./adCombinationsCard";
import { useAppSelector } from "@/hooks/useRedux";

interface AdCombinationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callAction: any;
  posts: any;
}

const adArray = [
  {
    status:
      "💻 Elevate your typing game with Epodex! Our wireless keyboards blend style and comfort for an unpar ...",
    media: "/assets/post background.png",
    example:
      "✨ Experience Seamless Typing! Join the Epodex Revolution for Wireless Keyboards Comfort & Style Combined!",
  },
  {
    status:
      "🌟 Tired of tangled wires and uncomfortable typing? Say hello to Epodex! Our premium wireless keyboa ...",
    media: "/assets/post background.png",
    example:
      "🚀 Elevate Your Workspace! Discover Epodex - where Functionality Meets Aesthetics Type with Precision!",
  },
  {
    status:
      "🖥️ Meet your new favorite workspace companion – Epodex wireless keyboards! 💼 Designed for both cas ...",
    media: "/assets/post background.png",
    example:
      "💻 Professionals' Choice! Unleash Creativity with Epodex Wireless Keyboards Durability Meets Design! Get Yours Today!",
  },
  {
    status:
      "✨ Discover the perfect blend of comfort and elegance with Epodex wireless keyboards! 🚀 Ideal for an ...",
    media: "/assets/post background.png",
    example:
      "🌟 Comfort at Your Fingertips! Upgrade to Epodex Wireless Keyboards! Reliability Never Looked This Good!",
  },
  {
    status:
      "💻 Elevate your typing game with Epodex! Our wireless keyboards blend style and comfort for an unpar ...",
    media: "/assets/post background.png",
    example:
      "✨ Experience Seamless Typing! Join the Epodex Revolution for Wireless Keyboards Comfort & Style Combined!",
  },
  {
    status:
      "🌟 Tired of tangled wires and uncomfortable typing? Say hello to Epodex! Our premium wireless keyboa ...",
    media: "/assets/post background.png",
    example:
      "🚀 Elevate Your Workspace! Discover Epodex - where Functionality Meets Aesthetics Type with Precision!",
  },
  {
    status:
      "🖥️ Meet your new favorite workspace companion – Epodex wireless keyboards! 💼 Designed for both cas ...",
    media: "/assets/post background.png",
    example:
      "💻 Professionals' Choice! Unleash Creativity with Epodex Wireless Keyboards Durability Meets Design! Get Yours Today!",
  },
  {
    status:
      "✨ Discover the perfect blend of comfort and elegance with Epodex wireless keyboards! 🚀 Ideal for an ...",
    media: "/assets/post background.png",
    example:
      "🌟 Comfort at Your Fingertips! Upgrade to Epodex Wireless Keyboards! Reliability Never Looked This Good!",
  },
];

const AdCombinationModal = ({
  open,
  onOpenChange,
  callAction,
  posts,
}: AdCombinationModalProps) => {
  const generatePrimaryText = useAppSelector(
    (state) => state.reduxStore.generated_suggestions?.descriptions
  );
  const generateExampleText = useAppSelector(
    (state) => state.reduxStore.generated_suggestions?.headlines
  );

  // Combine `posts` and `generatePrimaryText`
  const combinedArray = posts?.map((post: any, index: number) => ({
    media: post,
    status: generatePrimaryText
      ? generatePrimaryText.map((item: any) => item)
      : [],
    example: generateExampleText
      ? generateExampleText.map((item: any) => item)
      : [],
  }));

  // const result = posts.flatMap((media:any) =>
  //   generatePrimaryText.flatMap((status:any) =>
  //     generateExampleText.map((example:any) => ({ media, status, example }))
  //   )
  // );
  const result: any = [];

  posts?.forEach((media: any) => {
    if (media) {
      generatePrimaryText?.forEach((status: any, index: any) => {
        result.push({
          media,
          status,
          example: generateExampleText[index],
        });
      });
    }
  });

  console.log(combinedArray);

  console.log("combinedArray", result);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] w-11/12 max-h-[95vh] overflow-hidden">
        <ScrollArea className=" h-[80vh] p-4 ">
          <DialogHeader className="pl-2">
            <div className="flex items-center">
              <p className="mr-2 text-[16px] font-semibold ">Ad Combinations</p>
              <Info size={16} />
            </div>
          </DialogHeader>
          <div className="pl-2">
            <Tabs defaultValue="Feeds">
              <TabsList className="flex justify-start p-0 mb-8 mt-2 bg-transparent ">
                <TabsTrigger
                  value="Feeds"
                  className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline  data-[state=active]:underline-offset-8  data-[state=inactive]:text-[#636060]"
                >
                  Feeds
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Feeds">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {result?.map((item: any) => (
                    <div key={item.id} className="col-span-1">
                      <AdCombinationCard callAction={callAction} data={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdCombinationModal;
