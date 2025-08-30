import { ColoredText } from "../ColoredText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Color = ({ name, code }: { name: string; code: string }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(`§${code}`);
    alert(`Copied "§${code}" (${name}) to clipboard`); //TODO: toast
  };

  return (
    <div
      className="p-4 rounded-md cursor-pointer hover:bg-black/20"
      onClick={handleClick}
      title={`Click to copy §${code}`}
    >
      <span>§{code}</span>
      <ColoredText>{`§c§${code}${name} `}</ColoredText>
    </div>
  );
};

export const ColorsGuideModalButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="py-2 button w-40">Colors Guide</button>
      </DialogTrigger>

      <DialogContent className="book bg-transparent max-w-2xl">
        <DialogHeader>
          <DialogTitle>Colors Guide</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Just like in minecraft you can use the "§" symbol to color texts.
          </p>
          <p>("&" is also supported.)</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Color name="Black" code="0" />
            <Color name="Dark Blue" code="1" />
            <Color name="Dark Green" code="2" />
            <Color name="Dark Aqua" code="3" />
            <Color name="Dark Red" code="4" />
            <Color name="Dark Purple" code="5" />
            <Color name="Gold" code="6" />
            <Color name="Gray" code="7" />
            <Color name="Dark Gray" code="8" />
            <Color name="Blue" code="9" />
            <Color name="Green" code="a" />
            <Color name="Aqua" code="b" />
            <Color name="Red" code="c" />
            <Color name="Light Purple" code="d" />
            <Color name="Yellow" code="e" />
            <Color name="White" code="f" />
            <Color name="Obfuscated" code="k" />
            <Color name="Bold" code="l" />
            <Color name="Strikethrough" code="m" />
            <Color name="Underline" code="n" />
            <Color name="Italic" code="o" />
            <Color name="Reset" code="r" />
          </div>
          <p className="mt-4">
            Example: To make a text red, you would write "§cText".
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
