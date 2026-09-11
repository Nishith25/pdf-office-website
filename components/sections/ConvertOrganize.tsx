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
    background: "#FFF5E4",
    iconBackground: "#FFE9C4",
    color: "#E39000",
  },
  {
    icon: FileText,
    title: "Word to PDF",
    background: "#EFF4FF",
    iconBackground: "#DFE8FF",
    color: "#5578C9",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel to PDF",
    background: "#EDFFF2",
    iconBackground: "#D9F8E1",
    color: "#3E9854",
  },
  {
    icon: Upload,
    title: "Import Files",
    background: "#FFF1F6",
    iconBackground: "#FFE2EC",
    color: "#D94078",
  },
];

const categories = [
  {
    icon: IdCard,
    label: "ID Card",
    background: "#EEF3FF",
    color: "#4F6FFF",
  },
  {
    icon: GraduationCap,
    label: "Academic",
    background: "#F5EEFF",
    color: "#7D57DB",
  },
  {
    icon: UserRound,
    label: "Personal",
    background: "#EFFFF4",
    color: "#22A765",
  },
  {
    icon: Tags,
    label: "Custom Tags",
    background: "#FFF4E6",
    color: "#DD8A00",
  },
];

export default function ConvertOrganize() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="organize"
      className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
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
            duration: 0.5,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold text-[#4F6FFF]">
            Convert & Organize
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
            Your document workspace, organized.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#747C8F] sm:text-base">
            Convert files into PDFs and keep important documents easy
            to find.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* Convert */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="rounded-[24px] border border-[#E5EAF4] bg-[#F4F7FF] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#4F6FFF]">
                  Convert
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#171C2B] sm:text-2xl">
                  Files in. PDFs out.
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#E0E8FF]">
                <FileText className="h-4 w-4 text-[#4F6FFF]" />
              </div>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#727A8C]">
              Convert images, documents and spreadsheets into PDF.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
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
                              y: 10,
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
                        delay:
                          index *
                          0.04,
                      }}
                      className="flex items-center gap-3 rounded-[15px] p-3"
                      style={{
                        backgroundColor:
                          item.background,
                      }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                        style={{
                          backgroundColor:
                            item.iconBackground,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{
                            color:
                              item.color,
                          }}
                        />
                      </div>

                      <p className="text-[11px] font-semibold text-[#242938]">
                        {item.title}
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
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="rounded-[24px] border border-[#EBE4F1] bg-[#FAF6FF] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#8B18A8]">
                  Organize
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#171C2B] sm:text-2xl">
                  Find documents faster.
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F0E3F7]">
                <FolderOpen className="h-4 w-4 text-[#8B18A8]" />
              </div>
            </div>

            <div className="mt-4 rounded-[16px] border border-[#E5E3EA] bg-white p-3">
              <div className="flex items-center gap-2 rounded-full border border-[#DDE0E7] px-3 py-2">
                <Search className="h-3.5 w-3.5 text-[#666E7D]" />

                <span className="text-[10px] text-[#9A9FAC]">
                  Search documents...
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
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
                                0.98,
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
                        delay:
                          index *
                          0.04,
                      }}
                      className="flex items-center gap-2.5 rounded-[14px] p-3"
                      style={{
                        backgroundColor:
                          category.background,
                      }}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        style={{
                          color:
                            category.color,
                        }}
                      />

                      <span className="text-[10px] font-semibold text-[#51596B]">
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