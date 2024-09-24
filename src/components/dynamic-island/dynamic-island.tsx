import React from "react";
import PixyAvatar from "../../assets/pixy.png";
import { IconBell, IconCornerDownLeft, IconHistory } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicIslandWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dynamic-island-wrapper bg-indigo-100 shadow-inner rounded-b-3xl w-fit mx-auto p-1.5 -mt-1.5">
      {children}
    </div>
  );
};

const DynamicIsland = (): JSX.Element => {
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleShowSearch = (toggle: boolean) => {
    setShowSearch(toggle);
  };

  return (
    <DynamicIslandWrapper>
      <motion.div
        className="dynamic-island ai-gradient p-1 flex items-center gap-1 rounded-full z-20"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence mode="popLayout">
          {!showSearch ? (
            <motion.div
              key="default-view"
              className="flex items-center w-full gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="quick-action-icons-wrapper flex items-center gap-4 ml-3">
                <IconBell
                  size={14}
                  strokeWidth={2}
                  className="text-white hover:brightness-90"
                />
                <IconHistory
                  size={14}
                  strokeWidth={2}
                  className="text-white hover:brightness-90"
                />
              </div>
              <AskAIButton onClick={() => handleShowSearch(true)} />
              <div className="flex items-center gap-1">
                <SuggestionButton>High priority</SuggestionButton>
                <SuggestionButton>My open projects</SuggestionButton>
                <SuggestionButton>Add reminder</SuggestionButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-view"
              className="flex items-center w-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "560px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                className="bg-transparent focus:outline-none px-3 text-white text-sm w-full"
                onBlur={() => handleShowSearch(false)}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DynamicIslandWrapper>
  );
};

const AskAIButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children: _, ...otherProps } = props;
  return (
    <button
      className="bg-white/20 text-sm focus:outline-none rounded-full px-2 py-1 flex items-center gap-2 min-w-[160px] border border-white/20 ml-3"
      {...otherProps}
    >
      <img
        src={PixyAvatar}
        className="w-4 h-4 rounded-full"
        alt="pixy-avatar"
      />
      <span className="text-xs font-medium text-white">Ask AI</span>
    </button>
  );
};

const SuggestionButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, ...otherProps } = props;
  return (
    <button
      className="bg-white/30 border border-white/20 text-xs px-3 py-1 rounded-full focus:outline-none text-white flex items-center gap-1 backdrop-blur-3xl hover:bg-white/40"
      {...otherProps}
    >
      <IconCornerDownLeft size={14} strokeWidth={2} className="text-white" />
      {children}
    </button>
  );
};

export { DynamicIsland };
