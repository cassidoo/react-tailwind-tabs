// TailwindTabs by @cassidoo
// github.com/cassidoo/react-tailwind-tabs

import React, { useState, createContext, useContext, Children } from "react";

// Customize your colors
let tabBackgroundColorClass = "bg-white";
let borderColorClass = "border-pink-300";
let hoverBorderColorClass = "hover:border-accent-900";
let textColorClass = "text-black";
let hoverTextColorClass = "hover:text-pink-600";

const TabsContext = createContext();

function TailwindTabs({ children }) {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
			<div>{children}</div>
		</TabsContext.Provider>
	);
}

const TabContext = createContext();

function TailwindTabList({ children }) {
	const wrappedChildren = Children.map(children, (child, index) => (
		<TabContext.Provider value={index}>{child}</TabContext.Provider>
	));
	return (
		<ul className="flex flex-wrap justify-center mb-6">{wrappedChildren}</ul>
	);
}

function TailwindTab({ children, isDisabled, ...rest }) {
	const index = useContext(TabContext);
	const { activeIndex, setActiveIndex } = useContext(TabsContext);
	const isActive = index === activeIndex;
	return (
		<li
			className={`inline-block cursor-pointer font-medium mr-2 p-4 ${tabBackgroundColorClass} ${textColorClass} border-b-4 ${hoverTextColorClass} ${hoverBorderColorClass} ${
				isDisabled ? "disabled" : isActive ? `active ${borderColorClass}` : ""
			}`}
			onClick={isDisabled ? undefined : () => setActiveIndex(index)}
			key={index + "tab"}
			{...rest}
		>
			{children}
		</li>
	);
}

function TailwindTabPanels({ children }) {
	const { activeIndex } = useContext(TabsContext);
	return <div>{children[activeIndex]}</div>;
}

function TailwindTabPanel({ children }) {
	return children;
}

function TailwindComposedTabs({ data }) {
	return (
		<TailwindTabs>
			<TailwindTabList>
				{data.map((tab, i) => (
					<TailwindTab key={`tw-tab-${i}`}>{tab.label}</TailwindTab>
				))}
			</TailwindTabList>
			<TailwindTabPanels>
				{data.map((tab, i) => (
					<TailwindTabPanel key={`tw-tabp-${i}`}>
						{tab.content}
					</TailwindTabPanel>
				))}
			</TailwindTabPanels>
		</TailwindTabs>
	);
}

export {
	TailwindTabs,
	TailwindTabList,
	TailwindTab,
	TailwindTabPanels,
	TailwindTabPanel,
	TailwindComposedTabs,
};
