import { create } from "zustand"
import { axiosInstance } from "../lib/axois"
import toast from "react-hot-toast"
import { useauthstore } from "./auth.store";

export const usechatstore = create((set, get) => ({
    messages: [],
    users: [],
    selecteduser: null,
    ismessagelod: false,
    isuserlod: false,

    getUser: async () => {
        set({ isuserlod: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });

        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isuserlod: false });
        }
    },

    getMessages: async (userId) => {
        set({ ismessagelod: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ ismessagelod: false });
        }
    },

    sendMessages: async (messagedata) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messagedata);
            set({ messages: [...messages, res.data] });

        } catch (error) {
            toast.error(error.response.data.messages);
        }


    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useauthstore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useauthstore.getState().socket;
    socket.off("newMessage");
  }
})

)

