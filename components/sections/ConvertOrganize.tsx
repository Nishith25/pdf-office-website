"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  FileImage,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  GraduationCap,
  IdCard,
  Search,
  Tags,
  Upload,
  UserRound,
} from "lucide-react";

const conversions = [
  {
    icon: FileImage,
    title: "Image to PDF",
    description:
      "Turn images into clean PDF documents.",
    background:
      "#FFF5E4",
    iconBackground:
      "#FFE9C4",
    color: "#E39000",
  },
  {
    icon: FileText,
    title: "Word to PDF",
    description:
      "Convert supported Word files into PDF.",
    background:
      "#EFF4FF",
    iconBackground:
      "#DFE8FF",
    color: "#5578C9",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel to PDF",
    description:
      "Create PDFs from supported spreadsheet files.",
    background:
      "#EDFFF2",
    iconBackground:
      "#D9F8E1",
    color: "#3E9854",
  },
  {
    icon: Upload,
    title: "Import Files",
    description:
      "Bring existing documents into your workspace.",
    background:
      "#FFF1F6",
    iconBackground:
      "#FFE2EC",
    color: "#D94078",
  },
];

const categories = [
  {
    icon: IdCard,
    label: "ID Card",
    background:
      "#EEF3FF",
    color: "#4F6FFF",
  },
  {
    icon: GraduationCap,
    label: "Academic",
    background:
      "#F5EEFF",
    color: "#7D57DB",
  },
  {
    icon: UserRound,
    label: "Personal",
    background:
      "#EFFFF4",
    color: "#22A765",
  },
  {
    icon: Tags,
    label: "Custom Tags",
    background:
      "#FFF4E6",
    color: "#DD8A00",
  },
];

export default function ConvertOrganize() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="organize"
      className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold text-[#4F6FFF]">
            Convert & Organize
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.055em] text-[#111318] sm:text-5xl lg:text-6xl">
            Your document
            workspace, organized.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#747C8F] sm:text-lg">
            Convert everyday files
            into PDFs and keep your
            documents easier to
            find.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Convert */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 32,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="rounded-[30px] border border-[#E5EAF4] bg-[#F4F7FF] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#4F6FFF]">
                  Convert
                </p>

                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#171C2B]">
                  Files in.
                  PDFs out.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E0E8FF]">
                <FileText className="h-5 w-5 text-[#4F6FFF]" />
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#727A8C]">
              Import documents and
              images, then convert
              supported formats into
              portable PDFs.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {conversions.map(
                (
                  item,
                  index,
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <motion.div
                      key={
                        item.title
                      }
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              y: 14,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration:
                          0.4,
                        delay:
                          reduceMotion
                            ? 0
                            : index *
                              0.06,
                      }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -4,
                            }
                      }
                      className="rounded-[20px] p-4"
                      style={{
                        backgroundColor:
                          item.background,
                      }}
                    >
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-[14px]"
                        style={{
                          backgroundColor:
                            item.iconBackground,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{
                            color:
                              item.color,
                          }}
                        />
                      </div>

                      <p className="mt-5 text-sm font-bold text-[#242938]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-[#7D8595]">
                        {
                          item.description
                        }
                      </p>
                    </motion.div>
                  );
                },
              )}
            </div>
          </motion.div>

          {/* Organize */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 32,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="rounded-[30px] border border-[#EBE4F1] bg-[#FAF6FF] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#8B18A8]">
                  Organize
                </p>

                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#171C2B]">
                  Find documents
                  faster.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F0E3F7]">
                <FolderOpen className="h-5 w-5 text-[#8B18A8]" />
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#727A8C]">
              Search files and
              separate important
              documents into useful
              categories.
            </p>

            {/* Search mockup */}
            <div className="mt-8 rounded-[22px] border border-[#E5E3EA] bg-white p-4 shadow-[0_12px_35px_rgba(55,43,70,0.05)]">
              <div className="flex items-center gap-3 rounded-full border border-[#DDE0E7] px-4 py-3">
                <Search className="h-4 w-4 text-[#666E7D]" />

                <span className="text-xs text-[#9A9FAC]">
                  Search
                  documents...
                </span>
              </div>

              <div className="mt-4 flex gap-2 overflow-hidden">
                <span className="shrink-0 rounded-full bg-[#4F6FFF] px-4 py-2 text-[10px] font-semibold text-white">
                  All Docs
                </span>

                <span className="shrink-0 rounded-full border border-[#CACDD5] px-4 py-2 text-[10px] text-[#636A79]">
                  Business Card
                </span>

                <span className="shrink-0 rounded-full border border-[#CACDD5] px-4 py-2 text-[10px] text-[#636A79]">
                  ID Card
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {categories.map(
                (
                  category,
                  index,
                ) => {
                  const Icon =
                    category.icon;

                  return (
                    <motion.div
                      key={
                        category.label
                      }
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              scale:
                                0.97,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration:
                          0.35,
                        delay:
                          reduceMotion
                            ? 0
                            : index *
                              0.05,
                      }}
                      className="flex items-center gap-3 rounded-[18px] p-3.5"
                      style={{
                        backgroundColor:
                          category.background,
                      }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{
                          color:
                            category.color,
                        }}
                      />

                      <span className="text-[11px] font-semibold text-[#51596B]">
                        {
                          category.label
                        }
                      </span>
                    </motion.div>
                  );
                },
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}