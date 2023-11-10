import { useEffect } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Divider,
  Flex,
  IconButton,
  TableCaption,
  TableContainer,
  Table,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import MAX_TURN from "../../config/config";
import { useSelector } from "../../Provider/Provider";
import RateResult from "../RateResultCorrect/RateResult";

const TableResult = () => {
  const { getLocalStorage, clearLocalStorage } = useLocalStorage();
  const dataLocal = getLocalStorage("data") || [];

  // Ref for table navigation
  const pageTableRef = useRef(0);
  const tableRef = useRef(null);

  const { state, data, dispatch } = useSelector();
  const { turn, result } = state;

  // Scroll to the beginning when the game is complete or there are no more turns
  useEffect(() => {
    if (result === "CORRECT" || turn === 0) {
      pageTableRef.current = 0;
      const scrollWidth = tableRef.current?.clientWidth * pageTableRef.current;
      tableRef.current.scroll({
        left: scrollWidth,
        behavior: "smooth",
      });
    }
  }, [data, state]);

  // Event listeners for table navigation
  useEffect(() => {
    function handleScrollTable(e) {
      if (
        e.key === "ArrowRight" &&
        pageTableRef.current < dataLocal?.length - 1
      ) {
        pageTableRef.current += 1;
      } else if (e.key === "ArrowLeft" && pageTableRef.current > 0) {
        pageTableRef.current -= 1;
      }

      const scrollWidth = tableRef.current.clientWidth * pageTableRef.current;
      console.log(scrollWidth);
      tableRef.current.scroll({
        left: scrollWidth,
        behavior: "smooth",
      });
    }

    function handlePageTable() {
      const scrollLeft = tableRef.current.scrollLeft;
      pageTableRef.current = Math.round(
        scrollLeft / tableRef.current.clientWidth
      );
    }

    // Add and remove event listeners
    const table = tableRef.current;

    if (table) {
      document.addEventListener("keydown", handleScrollTable);
      table.addEventListener("scroll", handlePageTable);
    }

    return () => {
      if (table) {
        document.removeEventListener("keydown", handleScrollTable);
        table.removeEventListener("scroll", handlePageTable);
      }
    };
  }, [dataLocal]);

  // Function to clear stored data on delete icon click
  function handleRemoveData() {
    clearLocalStorage("data");
    dispatch({
      type: "RESET",
    });
  }

  return (
    <>
      {dataLocal?.length > 0 && (
        <Flex
          ref={tableRef}
          overflow={dataLocal?.length > 0 ? "scroll hidden" : "hidden"}
        >
          <IconButton
            position={"fixed"}
            right={8}
            color={"brand.700"}
            background={"burlywood"}
            variant={"solid"}
            icon={<DeleteIcon />}
            onClick={handleRemoveData}
          />

          {dataLocal?.map((data, index) => {
            return (
              <TableContainer
                key={index}
                border={"4px solid #ccc"}
                borderRadius={8}
                w={"100vw"}
                flexShrink={0}
              >
                <Table>
                  <TableCaption fontSize={20}>
                    Lần chơi thứ: {dataLocal.length - index} /{" "}
                    {dataLocal.length}
                  </TableCaption>
                  <TableCaption fontSize={20}>
                    Số lần nhập tối đa: {data[0].maxTurn || MAX_TURN}
                  </TableCaption>
                  <thead>
                    <tr>
                      <th>Số lần nhập</th>
                      <th>Số nhập vào</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length &&
                      data?.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <Text align={"center"}>{index + 1}</Text>
                            <Divider />
                          </td>
                          <td>
                            <Text align={"center"}>{data.number}</Text>
                            <Divider />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <RateResult
                    turnUser={data?.length}
                    maxTurn={data[index]?.maxTurn}
                    correct={data[data?.length - 1]?.right ? true : false}
                  />
                </Table>
              </TableContainer>
            );
          })}
        </Flex>
      )}
    </>
  );
};

export default TableResult;
