import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  min-width: 220px;
  padding: 12px 0;
  font-size: 1rem;
  position: relative;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  padding: 0 20px 8px 20px;
  color: #222;
`;

const Divider = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 8px 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f5f5f5;
  }
`;

const MenuDesc = styled.div`
  font-size: 0.9em;
  color: #888;
`;

const Icon = styled.span`
  font-size: 1.1em;
  margin-left: 12px;
`;

const SubmenuArrow = styled.span`
  margin-left: 8px;
  font-size: 1em;
`;

const SubmenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 4px;
  z-index: 100;
`;

export default function DropdownMenu({ title, items }) {
  const [openSubmenuIdx, setOpenSubmenuIdx] = useState(null);

  return (
    <Dropdown>
      {title && <SectionTitle>{title}</SectionTitle>}
      {title && <Divider />}
      {items.map((item, idx) => (
        <MenuItem
          key={idx}
          onMouseEnter={() => item.submenu ? setOpenSubmenuIdx(idx) : setOpenSubmenuIdx(null)}
          onMouseLeave={() => setOpenSubmenuIdx(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {item.label}
              {item.icon && <Icon>{item.icon}</Icon>}
              {item.submenu && <SubmenuArrow>▶</SubmenuArrow>}
            </span>
            {item.description && <MenuDesc>{item.description}</MenuDesc>}
          </div>
          {/* Submenu */}
          {item.submenu && openSubmenuIdx === idx && (
            <SubmenuWrapper>
              <DropdownMenu items={item.submenu} />
            </SubmenuWrapper>
          )}
        </MenuItem>
      ))}
    </Dropdown>
  );
} 