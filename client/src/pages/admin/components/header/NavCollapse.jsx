import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavCollapse = ({ title, content, icon, name, activeNavName, setActiveNavName }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="collapse-arrow collapse min-h-0 rounded-none bg-base-200 py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`collapse-title flex min-h-0 items-center gap-x-2 py-0 pl-0 text-lg font-medium ${
          name === activeNavName ? 'font-bold text-primary' : 'font-semibold text-[#A5A5A5]'
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">
          {content.map((item) => (
            <Link to={item.link} key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavCollapse;
