"use client";

// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const router = useRouter();

  // 直接跳转 dashboard 页面
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Welcome to My test DApp</h1>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#0080ff' }}
        onClick={() => router.push("/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
