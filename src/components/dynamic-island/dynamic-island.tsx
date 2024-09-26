import React from "react";
import PixyAvatar from "../../assets/pixy.png";
import {
  IconBell,
  IconCornerDownLeft,
  IconHistory,
  IconX,
  IconEdit,
  IconCopy,
  IconLink,
  IconDownload,
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

const HighPriorityList = () => {
  const projects = [
    {
      name: "CW33 - BAU - SASA Extra 15% Off - W_Beauty - SGHK",
      dueDate: "Oct 25",
      status: "DRAFT",
      creatives: 4,
      sizes: 40,
      campaign: "LUX_FESTIVAL 3RD ANNIVERSARY",
    },
    {
      name: "CW33 - BAU - Haven Lifestyle Up to 55% Off - SG - Lifestyle",
      dueDate: "Oct 22",
      status: "DRAFT",
      creatives: 4,
      sizes: 40,
      campaign: "LUX_FESTIVAL 3RD ANNIVERSARY",
    },
    {
      name: "CW33 - BAU - Haven Lifestyle Up to 55% Off - SG - Lifestyle",
      dueDate: "Oct 22",
      status: "DRAFT",
      creatives: 4,
      sizes: 40,
      campaign: "LUX_FESTIVAL 3RD ANNIVERSARY",
    },
    {
      name: "CW33 - BAU - Haven Lifestyle Up to 55% Off - SG - Lifestyle",
      dueDate: "Oct 22",
      status: "DRAFT",
      creatives: 4,
      sizes: 40,
      campaign: "LUX_FESTIVAL 3RD ANNIVERSARY",
    },
    // Add more projects as needed
  ];

  return (
    <motion.div
      className="overflow-x-auto rounded-lg border"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Due date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {projects.map((project, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1723908183237-d8af011f465d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Project thumbnail"
                    className="w-10 h-10 rounded mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {project.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {project.status} • {project.creatives} creatives •{" "}
                      {project.sizes} sizes • {project.campaign}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{project.dueDate}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <IconEdit
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                  <IconCopy
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                  <IconLink
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                  <IconDownload
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

const UserMessage = ({ message }: { message: string }) => (
  <div className="flex items-start gap-2 mb-8 justify-end">
    <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
      <p className="text-sm">{message}</p>
    </div>
    <img
      src={USER_PROFILE_IMAGE}
      className="w-8 h-8 rounded-full mt-1"
      alt="user-avatar"
    />
  </div>
);

const DynamicIsland = (): JSX.Element => {
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [showHighPriorityList, setShowHighPriorityList] =
    React.useState<boolean>(false);

  const handleApplySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleShowSearch = (toggle: boolean) => {
    setShowSearch(toggle);
    if (!toggle) {
      setShowHighPriorityList(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleShowSearch(false);
    }
  };

  const handleHighPriorityClick = () => {
    setSearchQuery("High priority");
    setShowHighPriorityList(true);
    handleShowSearch(true);
  };

  const getSuggestionsByPathname = (searchSuggestion: boolean) => {
    switch (window.location.pathname) {
      case "/projects":
        if (searchSuggestion) {
          return (
            <>
              <SuggestionButton
                searchSuggestion
                onClick={handleHighPriorityClick}
              >
                High priority
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("My open projects");
                }}
              >
                My open projects
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Add reminder");
                }}
              >
                Add reminder
              </SuggestionButton>
            </>
          );
        } else {
          return (
            <>
              <SuggestionButton onClick={handleHighPriorityClick}>
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
            </>
          );
        }
      case "/editor":
        if (searchSuggestion) {
          return (
            <>
              <SuggestionButton
                searchSuggestion
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Add sizes");
                }}
              >
                Add sizes
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Import CSV");
                }}
              >
                Import CSV
              </SuggestionButton>
              <SuggestionButton
                searchSuggestion
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Predict performance");
                }}
              >
                Predict performance
              </SuggestionButton>
            </>
          );
        } else {
          return (
            <>
              <SuggestionButton
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Add sizes");
                }}
              >
                Add sizes
              </SuggestionButton>
              <SuggestionButton
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Import CSV");
                }}
              >
                Import CSV
              </SuggestionButton>
              <SuggestionButton
                onClick={() => {
                  handleShowSearch(true);
                  setSearchQuery("Predict performance");
                }}
              >
                Predict performance
              </SuggestionButton>
            </>
          );
        }
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
                {getSuggestionsByPathname(false)}
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
          {showHighPriorityList ? (
            <>
              <UserMessage message="High priority" />
              <div className="flex items-start gap-2">
                <img
                  src={PixyAvatar}
                  className="w-8 h-8 rounded-full"
                  alt="pixy-avatar"
                />
                <HighPriorityList />
              </div>
            </>
          ) : searchQuery.length > 0 ? (
            <div className="search-chat-container"></div>
          ) : (
            <div className="search-suggestions-wrapper flex items-center justify-center gap-2">
              {getSuggestionsByPathname(true)}
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
