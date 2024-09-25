import React from "react";
import PixyAvatar from "../../assets/pixy.png";
import {
  IconBell,
  IconCornerDownLeft,
  IconHistory,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const USER_PROFILE_IMAGE: string =
  "https://avatars.githubusercontent.com/u/62352288?v=4" as const;

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
  const [userSearchQueryList, setUserSearchQueryList] = React.useState<
    string[]
  >([]);

  const handleUserSearchQuery = (query: string) => {
    setUserSearchQueryList((prev) => [...prev, query]);
  };

  const handleApplySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUserSearchQuery(searchQuery);
      handleShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleShowSearch = (toggle: boolean) => {
    setShowSearch(toggle);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleShowSearch(false);
    }
  };

  return (
    <DynamicIslandWrapper>
      <motion.div
        className="dynamic-island ai-gradient p-1 flex items-center gap-1 rounded-full z-20 h-[34px]"
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
                <SuggestionButton
                  onClick={() => {
                    handleShowSearch(true);
                    setSearchQuery("High priority");
                  }}
                >
                  High priority
                </SuggestionButton>
                <SuggestionButton
                  onClick={() => {
                    handleShowSearch(true);
                    setSearchQuery("My open projects");
                  }}
                >
                  My open projects
                </SuggestionButton>
                <SuggestionButton
                  onClick={() => {
                    handleShowSearch(true);
                    setSearchQuery("Add reminder");
                  }}
                >
                  Add reminder
                </SuggestionButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-view"
              className="flex items-center w-full pl-1"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "560px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center w-full">
                <img
                  src={PixyAvatar}
                  className="w-4 h-4 rounded-full"
                  alt="pixy-avatar"
                />
                <input
                  className="bg-transparent focus:outline-none px-1.5 text-white text-sm w-full placeholder:text-white/60"
                  // onBlur={() => {
                  //   if (searchQuery === "") {
                  //     handleShowSearch(false);
                  //   }
                  // }}
                  autoFocus
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    handleInputKeyDown(e);
                    handleApplySearch(e);
                  }}
                />
              </div>
              <button
                className="bg-white/20 text-white/60 rounded-full p-1 focus:outline-none border border-white/20"
                onClick={() => {
                  handleShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <IconX size={16} strokeWidth={2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {showSearch && (
        <motion.div
          className="search-popover-content bg-white p-4 rounded-xl shadow-xl absolute z-20 top-12 border w-[560px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.6 }}
        >
          {searchQuery.length > 0 ? (
            <></>
          ) : (
            <div className="search-suggestions-wrapper flex items-center justify-center gap-2">
              <SuggestionButton
                searchSuggestion
                onClick={() => setSearchQuery("High priority")}
              >
                High priority
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => setSearchQuery("My open projects")}
              >
                My open projects
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => setSearchQuery("Add reminder")}
              >
                Add reminder
              </SuggestionButton>
            </div>
          )}
        </motion.div>
      )}
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
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    searchSuggestion?: boolean;
  }
) => {
  const { children, ...otherProps } = props;
  return (
    <button
      className={
        "bg-white/30 border border-white/20 text-xs px-3 py-1 rounded-full focus:outline-none flex items-center gap-1 backdrop-blur-3xl hover:bg-white/40" +
        " " +
        (props.searchSuggestion
          ? "border-neutral-200 text-black"
          : "text-white")
      }
      {...otherProps}
    >
      <IconCornerDownLeft
        size={14}
        strokeWidth={2}
        className={props.searchSuggestion ? "text-black" : "text-white"}
      />
      {children}
    </button>
  );
};

export { DynamicIsland };
