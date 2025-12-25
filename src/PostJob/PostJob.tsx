import { Button, TagsInput } from '@mantine/core';
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from './RichTextEditor';

const PostJob = () => {
  return (
    <div className="w-full max-w-full mx-auto flex flex-col gap-10 mt-8 px-2">
      
      {/* Row 1, 2, 3 remains same */}
      <div className="flex gap-4 [&>*]:w-1/2">
        <SelectInput {...fields[0]} />
        <SelectInput {...fields[1]} />
      </div>

      <div className="flex gap-4 [&>*]:w-1/2">
        <SelectInput {...fields[2]} />
        <SelectInput {...fields[3]} />
      </div>

      <div className="flex gap-4 [&>*]:w-1/2">
        <SelectInput {...fields[4]} />
        <SelectInput {...fields[5]} />
      </div>

      {/* Skills */}
      <div className="w-full">
        <TagsInput
          withAsterisk
          label="Skills"
          placeholder="Enter skill"
          splitChars={[',', ' ', '|']}
          clearable
          acceptValueOnBlur
          variant="filled"
        />
      </div>

      {/* Job Description aur Buttons ka Group */}
      <div className="flex flex-col gap-2"> 
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium mb-2">Job Description</div>
          <TextEditor />
        </div>

        {/* Buttons: mt-2 ya gap-2 se editor ke ekdum pass aa jayenge */}
        <div className="flex gap-4">
          <Button color="brightSun.4" variant="light">
            Publish Job
          </Button>
          <Button color="brightSun.4" variant="outline">
            Save as Draft
          </Button>
        </div>
      </div>

    </div>
  );
};

export default PostJob;