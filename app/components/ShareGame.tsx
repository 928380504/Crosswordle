"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareGameProps {
  score: number;
  timeElapsed: number;
  board: string[][];
  hintsUsed: number;
}

export default function ShareGame({ score, timeElapsed, board, hintsUsed }: ShareGameProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 生成游戏结果的表情符号表示
  const generateBoardEmoji = (board: string[][]) => {
    return board.map(row => {
      return row.map(cell => {
        if (!cell) return '⬜'; // 空格
        if (cell === row[row.indexOf(cell)]) return '🟩'; // 正确
        if (row.includes(cell)) return '🟨'; // 存在但位置错误
        return '⬛'; // 不存在
      }).join('');
    }).join('\n');
  };

  const handleShare = async () => {
    const shareText = `Crosswordle 每日挑战!\n\n分数: ${score}\n时间: ${formatTime(timeElapsed)}\n提示使用: ${hintsUsed}/3\n\n${generateBoardEmoji(board)}\n\n来挑战我吧！ https://crosswordle.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Crosswordle 游戏分享',
          text: shareText,
        });
        toast.success('分享成功！');
      } catch (err) {
        console.error('分享失败:', err);
        fallbackShare(shareText);
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('结果已复制到剪贴板！');
    }).catch(() => {
      toast.error('复制失败，请手动复制分享。');
    });
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="gap-2"
    >
      <Share2 className="w-4 h-4" />
      分享成绩
    </Button>
  );
} 