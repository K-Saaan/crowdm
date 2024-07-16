import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { cPage1Style, cSpanStyle } from "./Page1";





function Page6(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const spanStyle = cSpanStyle(theme);

  

  const ref = useRef(null);
  
      return (
          <>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 1,
                y: { duration: 1 },
            }}
            style={pageStyle}
            >
              hi

            </motion.div>
          </>
        );
      }
  
  export default Page6;