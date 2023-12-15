import useSupabase from "../hooks/useSupabase";
import { useQuery } from "@tanstack/react-query";
import { getObjects } from "../../utils/supabaseQueries";
import { fetchTitle, fetchDescription } from "./filter/queries";

function useObjectsQuery() {
  const client = useSupabase();
  const key = ["OBJECTS"];

  return useQuery({
    key,
    queryFn: async () => {
      let _unprocessedData = await getObjects(client).then(
        (result) => result.data,
      );
      let _processedData = [];
      for (let i = 0; i < _unprocessedData.length; i++) {
        let _tempObject = {};
        _tempObject.source = _unprocessedData[i];
        _tempObject.title = fetchTitle(_unprocessedData[i]);

        try {
          _tempObject.description = fetchDescription(_unprocessedData[i]);
        } catch (e) {
          _tempObject.description = "no description";
        }

        _processedData.push(_tempObject);
      }

      return _processedData;
    },
  });
}

export default useObjectsQuery;

function fetchObjectName(object) {}
