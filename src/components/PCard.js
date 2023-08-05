import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
  IconButton,
  Input,
  LinearProgress,
} from "@mui/joy";
import { useRef, useState } from "react";
import { CopyAll, SocialDistance } from "@mui/icons-material";

function PCard() {
  const [password, setPassword] = useState("ahmet kaya");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordPrefs, setPasswordPrefs] = useState({
    [0]: false,
    [1]: false,
    [2]: false,
    [3]: false,
    [4]: 16,
  });

  const inputRef = (useRef < HTMLInputElement) | (null > null);

  const handlePreferenceChange = (key, event) => {
    setPasswordPrefs((prevState) => ({
      ...prevState,
      [key]: event.target.checked,
    }));
  };

  const handleGeneratePassword = () => {
    setIsLoading(true);

    console.log(inputRef);

    const newPass = generateRandomString(
      passwordPrefs[4],
      passwordPrefs[0],
      passwordPrefs[1],
      passwordPrefs[2],
      passwordPrefs[3]
    );

    setPassword(newPass);

    setIsLoading(false);
  };

  function generateRandomString(
    length,
    includeSymbols,
    includeNumbers,
    includeLowercase,
    includeUppercase
  ) {
    const symbols = '!@#$%^&*()_-+=[]{}|:;"<>,.?/';
    const numbers = "0123456789";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let allowedChars = "";
    let generatedString = "";

    if (includeSymbols) allowedChars += symbols;
    if (includeNumbers) allowedChars += numbers;
    if (includeLowercase) allowedChars += lowercase;
    if (includeUppercase) allowedChars += uppercase;

    if (allowedChars.length === 0) {
      console.error(
        "At least one option must be true (includeSymbols, includeNumbers, includeLowercase, includeUppercase)."
      );
      return "At least one option must be selected";
    }

    if (length == 0) length = 1;
    if (length > 36) length = 36;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      generatedString += allowedChars[randomIndex];
    }

    return generatedString;
  }

  function copyTextToClipboard() {
    setIsLoading(true);

    // Get the text from the input field
    const textToCopy = password;

    // Create a temporary input element to select and copy the text
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
      // Execute the copy command
      const copied = document.execCommand("copy");
    } catch (err) {
      console.error("Error copying text:", err);
    }

    // Clean up and remove the temporary input element
    document.body.removeChild(tempInput);

    setIsLoading(false);
  }

  return (
    <Card
      variant="solid"
      color="primary"
      sx={{
        width: 400,
        height: 400,
        margin: "2.5%",
      }}
      invertedColors
    >
      <CardContent>
        <CardContent sx={{ gap: 2 }}>
          <div>
            <Typography level="body-md">Your password is</Typography>
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", maxWidth: 1, marginBottom: 1 }}
            >
              <Typography level="h4">{password}</Typography>
              <IconButton
                onClick={copyTextToClipboard}
                aria-label="Copy"
                variant="solid"
                loading={isLoading}
              >
                <CopyAll />
              </IconButton>
            </CardContent>
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((password.length * 100) / 20, 100)}
            />
          </div>
          <Checkbox
            onChange={(event) => {
              handlePreferenceChange(0, event);
            }}
            size="md"
            variant="solid"
            label="Include Symbols"
          />
          <Checkbox
            onChange={(event) => {
              handlePreferenceChange(1, event);
            }}
            size="md"
            variant="solid"
            label="Include Numbers"
          />
          <Checkbox
            onChange={(event) => {
              handlePreferenceChange(2, event);
            }}
            size="md"
            variant="solid"
            label="Include Lowercase"
          />
          <Checkbox
            onChange={(event) => {
              handlePreferenceChange(3, event);
            }}
            size="md"
            variant="solid"
            label="Include Uppercase"
          />
          <Input
            placeholder="Lenght"
            variant="solid"
            defaultValue={16}
            type="number"
            startDecorator={<Typography variant="solid">Lenght: </Typography>}
            slotProps={{
              input: {
                ref: inputRef,
                min: 8,
                max: 36,
                step: 1,
              },
            }}
            onChange={(event) =>
              setPasswordPrefs((prevState) => ({
                ...prevState,
                [4]: event.target.value,
              }))
            }
          />
        </CardContent>
      </CardContent>

      <CardActions>
        <Button
          onClick={handleGeneratePassword}
          variant="solid"
          size="sm"
          loading={isLoading}
        >
          Generate Password
        </Button>
      </CardActions>
    </Card>
  );
}

export default PCard;
