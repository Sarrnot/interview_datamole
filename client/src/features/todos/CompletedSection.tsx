import { ReactNode } from "react";
import styled from "styled-components";

/** Keeps finished todos visually out of the way: a quiet heading + dimmed section. */
const Section = styled.section`
    margin-top: 16px;
    opacity: 0.65;
`;

const Heading = styled.h2`
    margin: 0 0 4px;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

/** Presentational chrome only — caller supplies the list as children. */
export const CompletedSection = ({ children }: { children: ReactNode }) => (
    <Section>
        <Heading>Completed</Heading>
        {children}
    </Section>
);
