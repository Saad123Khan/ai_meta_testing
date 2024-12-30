import * as React from "react";
import { ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setAdds } from "@/store/slices/addSlice";
import UploadFilesModal from "./uploadFilesModal";


interface AdsCarouselProps {
  addsData: any;
  setAddsData: any;
  carouselAttachments: any;
  setCarouselAttachments: any;
}

const AdsCarousel = ({
  addsData,
  setAddsData,
  carouselAttachments,
  setCarouselAttachments,
}: AdsCarouselProps) => {
  const dispatch = useAppDispatch();
  const [isUploadModal, setIsUploadModal] = React.useState(false);

  const { adds } = useAppSelector((state) => state.adds);

  const handleRemoveFile = (fileToRemove: any) => {
    const updatedAttachments = carouselAttachments.filter(
      (item: any) => item.file !== fileToRemove
    );
    setCarouselAttachments(updatedAttachments);

    const updatedFiles = addsData?.files?.filter(
      (file: any) => file.file !== fileToRemove
    );
    setAddsData({ ...addsData, files: updatedFiles });
    dispatch(setAdds({ ...adds, files: updatedFiles }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedAttachments = [...carouselAttachments];
    updatedAttachments[index].description = value;
    setCarouselAttachments(updatedAttachments);
  };

  return (
    <>
      <UploadFilesModal
        open={isUploadModal}
        onOpenChange={setIsUploadModal}
        addsData={addsData}
        setAddsData={setAddsData}
        handleRemoveFileAddsData={handleRemoveFile}
      />

      <div className="relative p-4">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full relative"
        >
          <CarouselPrevious className="absolute left-2 z-[1100] top-1/2 transform -translate-y-1/2 bg-transparent border-none">
            <Button size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </CarouselPrevious>

          <CarouselContent className="mx-12">
            {carouselAttachments.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 w-full sm:w-[60%] md:w-[50%] lg:w-[40%]"
              >
                <Card className="w-full h-[280px] max-w-full border-2 border-primary-foreground/30 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      {item.type === "video" ? (
                        <video
                          controls
                          src={
                            typeof item.file === "string"
                              ? item.file
                              : URL.createObjectURL(item.file)
                          }
                          className="w-full h-[200px] object-cover"
                        />
                      ) : (
                        <img
                          src={
                            typeof item.file === "string"
                              ? item.file
                              : URL.createObjectURL(item.file)
                          }
                          alt="File"
                          className="w-full h-[200px] object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setIsUploadModal(true)}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleRemoveFile(item.file)}
                          variant="secondary"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Input
                        type="text"
                        placeholder="Add description here"
                        value={item.description}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        className="mb-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            <CarouselItem className="pl-2 md:pl-4 w-full sm:w-[60%] md:w-[50%] lg:w-[40%]">
              <Card className="w-full h-[280px] max-w-full border-2 border-dashed border-primary-foreground/30 flex items-center justify-center">
                <Button
                  onClick={() => setIsUploadModal(true)}
                  className="bg-primary text-white hover:bg-primary-dark text-xs sm:text-sm md:text-base"
                >
                  <Plus className="h-6 w-6 " />
                  Upload Image/Video
                </Button>
              </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
            <Button size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CarouselNext>
        </Carousel>
      </div>
    </>
  );
};

export default AdsCarousel;
