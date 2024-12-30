import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({
  icon,
  title,
  bgColor,
  color,
  handleCard
}: {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  color: string;
  handleCard: any;
}) => {
  return (
    <Card onClick={handleCard} className={`${bgColor} border-none cursor-pointer shadow-sm`}>
      <CardContent className="flex flex-col items-center justify-center p-4 h-32">
        {icon}
        <h3 className= {`${color} mt-2 text-sm font-lg font-semibold text-center`} >{title}</h3>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
