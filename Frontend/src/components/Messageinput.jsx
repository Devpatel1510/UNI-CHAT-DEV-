import React, { useRef, useState } from 'react'
import { usechatstore } from '../store/useChatStore';
import { X,Send, Image } from 'lucide-react';
import toast from 'react-hot-toast';


function Messageinput() {
    const [text,settext] = useState("");
    const [image,setimage] = useState("");
    
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const {sendMessages} = usechatstore();

     const removeImage = () => {
    setImagePreview(null);
    setimage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setimage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

    const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text && !image) return;

  try {
    await sendMessages({ text, image });
    settext("");
    setimage(null);
    setImagePreview(null);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};
    
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
            <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
           <Send size={22} />
        </button>
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Messageinput
