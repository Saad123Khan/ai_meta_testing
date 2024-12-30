import CheckoutForm from "@/app/stripe/CheckoutForm";
import CustomInputField from "@/components/customInputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";

interface PaymentModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modalContent?: any;
  modalHeader?: any;
  modalFooter?: any;
  promise?: any;
  planData?: any;
  
}

const PaymentModal = ({
  planData,
  open,
  onOpenChange,
  promise,
}: PaymentModalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[455px] p-7">
        {/* <>
          <div>
            <CustomInputField
              label="Full Name"
              placeholder="Alex hales"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
          <div>
            <CustomInputField
              label="Credit Card Number"
              placeholder="1234 1234 1234 1234"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-1">
              <CustomInputField
                label="Exp Date"
                placeholder="MM/YY"
                labelCss="text-[12px] font-semibold mb-1 text-black"
                css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
                type="date"
              />
            </div>
            <div className="ml-1">
              <CustomInputField
                label="CVV"
                placeholder="..."
                css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
                labelCss="text-[12px] font-semibold mb-1 text-black"
                type="text"
              />
            </div>
          </div>
          <div>
            <CustomInputField
              label="Zip Code"
              placeholder="9012"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
        </> */}
        <div className="text-center mt-2" >
          <>
          <Elements stripe={promise}>
            <CheckoutForm planData={planData}/>
          </Elements>
        
         
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
