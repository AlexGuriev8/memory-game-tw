import { PlayerAvatar } from "@/components/custom/player-avatar";
import { OptionItem } from "@/components/custom/option-item";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  columnOptions,
  delayOptions,
  matchesOptions,
  maxAllowedUsers,
  rowOptions,
} from "@/features/options";

import { useSettingsStore, useSettingsActions } from "@/store";
import { GameModeType, GameModes } from "@/lib/types";

type GameSettingsProps = {
  resetGame: () => void;
  handleGameModeChange: (mode: GameModeType) => void;
};

export const GameSettings = ({
  handleGameModeChange,
  resetGame,
}: GameSettingsProps) => {
  const {
    columns,
    rows,
    delay,
    matchesCount,
    players,
    scores,
    activePlayer,
    isFlickering,
  } = useSettingsStore((state) => state);

  const { setMatchesCount, setColumns, setRows, setDelay, addPlayer } =
    useSettingsActions();

  return (
    <aside className="content gap-3.5 p-5 border border-gray-200 rounded-lg shadow-lg my-5 h-fit w-[280px]">
      <Tabs defaultValue={GameModes.single} className="mb-4">
        <OptionItem
          label="Mode"
          hoverText="Choose 'Single Player' for a solo memory challenge, or
            'Multi Player' to enjoy a competitive matching game with
            friends."
        >
          <TabsList>
            <TabsTrigger
              value={GameModes.single}
              onClick={() => handleGameModeChange(GameModes.single)}
            >
              Single Player
            </TabsTrigger>
            <TabsTrigger
              value={GameModes.multiple}
              onClick={() => handleGameModeChange(GameModes.multiple)}
            >
              Multi Player
            </TabsTrigger>
          </TabsList>

          <TabsContent value={GameModes.single}>
            <div className="flex flex-col gap-2">
              <PlayerAvatar
                name={players[0]}
                score={scores[0]}
                isActive
                isFlickering={false}
              />

              <div className="flex justify-end mt-2">
                <Button variant="outline" onClick={resetGame}>
                  Reset Game
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value={GameModes.multiple}>
            <div className="flex flex-col gap-2">
              {players.map((player, index) => (
                <PlayerAvatar
                  key={index}
                  name={player}
                  score={scores[index]}
                  isActive={index === activePlayer}
                  isFlickering={isFlickering && index === activePlayer}
                />
              ))}

              <div className="flex justify-end mt-2">
                <Button variant="outline" onClick={resetGame}>
                  Reset Game
                </Button>
                <Button
                  variant="outline"
                  onClick={addPlayer}
                  className="ml-2"
                  disabled={players.length === maxAllowedUsers}
                >
                  Add Player
                </Button>
              </div>
            </div>
          </TabsContent>
        </OptionItem>
      </Tabs>

      <OptionItem
        label="Matches Count"
        hoverText="Flip cards to find matching sets based on the selected 'Match
          Count'. Mismatched cards automatically turn back over,
          challenging your memory and strategy skills."
      >
        <RadioGroup
          defaultValue="2"
          onValueChange={(e) => setMatchesCount(Number(e))}
          value={`${matchesCount}`}
        >
          {matchesOptions.map(({ id, label, value }) => (
            <div key={id} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </OptionItem>

      <div className="mt-4">
        <OptionItem
          label="Delay"
          hoverText="Delay before selected non-matching cards are flipped back over."
        >
          <RadioGroup
            defaultValue="5"
            onValueChange={(e) => setDelay(Number(e))}
            value={`${delay}`}
          >
            {delayOptions.map(({ id, value, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </OptionItem>
      </div>

      <div className="flex gap-20 mt-4">
        <OptionItem
          label="Columns"
          hoverText="Provide custom number of Columns."
        >
          <RadioGroup
            defaultValue="5"
            onValueChange={(e) => setColumns(Number(e))}
            value={`${columns}`}
          >
            {columnOptions.map(({ id, value, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </OptionItem>

        <OptionItem label="Rows" hoverText="Provide custom number of Rows.">
          <RadioGroup
            defaultValue="5"
            onValueChange={(e) => setRows(Number(e))}
            value={`${rows}`}
          >
            {rowOptions.map(({ id, value, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </OptionItem>
      </div>
    </aside>
  );
};
