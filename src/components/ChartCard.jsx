import { motion } from "framer-motion";

export default function ChartCard({ title, description, right, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow hover:shadow-lg transition"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Right-aligned extra element (optional) */}
        {right && <div>{right}</div>}
      </div>

      {/* Chart Area */}
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}
