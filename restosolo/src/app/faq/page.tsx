"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface FaqApi {
  question: string;
  answer: string;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid rgba(223, 94, 0, 100)`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(24, 23, 28, 100)"
      : "rgba(43, 42, 50, 100)",
  color: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(223, 94, 0, 100)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [faq, setFaq] = React.useState<FaqApi[]>([]);

  React.useEffect(() => {
    fetch("https://resto-solo-app-production.up.railway.app/api/faq/")
      .then((response) => response.json())
      .then((data) => setFaq(data));
  }, []);

  return (
    <div
      id="faq"
      className="px-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "#18171C",
      }}
    >
      <h4 className="font-semibold text-lg text-orange-600 mb-6">
        Frequently Asked Questions
      </h4>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ width: "100%", maxWidth: "1000px" }} // Adjust the max width as needed
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{faq.length > 0 ? faq[0].question : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.length > 0 ? faq[0].answer : ""}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{faq.length > 0 ? faq[1].question : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.length > 0 ? faq[1].answer : ""}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{faq.length > 0 ? faq[2].question : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.length > 0 ? faq[2].answer : ""}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>{faq.length > 0 ? faq[3].question : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.length > 0 ? faq[3].answer : ""}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
