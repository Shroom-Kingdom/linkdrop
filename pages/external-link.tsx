import React from "react";

const ExternalLink: React.FC = ({ children, ...props }) => (
  <a target="_blank" rel="noopener" {...props}>
    {children}
  </a>
);

export default ExternalLink;
