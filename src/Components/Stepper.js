import * as React from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from "@mui/material";

const actions = [
  <div className="action-item">
    <a className="link-boxes" href="https://discord.com/invite/Pbk4sCEWDY" target="_blank" rel="noopener noreferrer">
      Join the discord
    </a>
  </div>,
  <div className="action-item">
    <a className="link-boxes" href="http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist" target="_blank" rel="noopener noreferrer">
      Subscribe to the mailing list
    </a>
  </div>,
  <div className="action-item">
    <p>
      <a className="separate-insta-linkedin link-boxes" href="https://instagram.com/swecc.uw" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <a className="separate-insta-linkedin link-boxes" href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
    </p>
  </div>,
  <div className="action-item">
    <div className="thanks-box">
      <p className="thanks-message">
        <strong>Thanks for Joining! </strong>
        We're looking forward to seeing you at our next meeting :)
      </p>
    </div>
  </div>,
];

const steps = [
  {
    label: "Join our discord",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Join out mailing list",
    description: "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Attend an event",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} className="step">
            <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>{step.label}</StepLabel>
            <StepContent>
              {/* <Typography>{step.description}</Typography> */}
              <div className="actionsContainer">
                <div></div>
              </div>
              <div className="actionsContainer">{actions[index]}</div>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button className="back-btn" disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography className="thanks-box">
            <p className="thanks-message">
              <strong>Thanks for Joining! </strong>
              We're looking forward to seeing you at our next meeting :)
            </p>
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
