import axios from 'axios';
import { QueryClient, useMutation, useQueryClient } from "react-query";

const useDeleteToDoDetailMutateTask = () => {
    const queryClient = useQueryClient();
    const deleteToDoDetailMutation = useMutation(
        (toDoDetail) => axios.delete("/api/toDoDetails/" + toDoDetail.id),
        {
            onMutate: async (toDoDetail) => {

                await queryClient.cancelQueries("toDoList");

                const previousToDoList = queryClient.getQueriesData("toDoList");


                queryClient.setQueryData("toDoList", (oldToDoList) =>
                    oldToDoList.map((oldToDo) => {
                        let newToDoDetails = [];
                        oldToDo.to_do_details.map((oldToDoDetail) => {
                            if (oldToDoDetail.id != toDoDetail.id) {
                                newToDoDetails.push(oldToDoDetail);
                            }
                        });
                        oldToDo.to_do_details = newToDoDetails;
                        return oldToDo;
                    })
                );
                return { previousToDoList };
            },
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            },
        }
    );
    return { deleteToDoDetailMutation };
};

export default useDeleteToDoDetailMutateTask;
