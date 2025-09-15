import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
    const location = useLocation();
    const querySearch = new URLSearchParams(location.search);
    
    // The 'step' from the URL is 1-based, Stepper is 0-based, so subtract 1
    const activeStep = Number(querySearch.get("step")) -1;

    // A function to render the correct component based on the step
    const renderStepContent = (step) => {
        switch (step) {
            case 1: // Corresponds to "?step=2" in URL
                return <DeliveryAddressForm />;
            case 2: // Corresponds to "?step=3" in URL
                return <OrderSummary />;
            default:
                return null;
        }
    };

    return (
        <div className="px-10 lg:px-20 mt-10">
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                
                <div className="mt-10">
                    {renderStepContent(activeStep)}
                </div>
            </Box>
        </div>
    );
}
