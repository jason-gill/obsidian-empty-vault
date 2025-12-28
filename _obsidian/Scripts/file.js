async function rename_file_catch_error(tp, title) {
    try {
        let filename = title.replace(/\W+/g, " ")
	    filename = filename.replace(/:/g, "_")
        await tp.file.rename(filename);
        return 1;
    } catch (error) {
        return 0;
    }
}

async function rename_file_with_retry(tp, title, prompt) {
    result = await rename_file_catch_error(tp, title);
    
    while (result == 0) {
        title = await tp.system.prompt("Rename failed. Try a different " + prompt + ".");
        result = await rename_file_catch_error(tp, title);
    }

    return title
}

async function rename_untitled_file(tp, prompt) {
    if (!prompt) {
        prompt = "Filename"
    }

    let title = tp.file.title;
    if (title.startsWith("Untitled")) {
        title = await tp.system.prompt("Enter a " + prompt + ".");
        title = rename_file_with_retry(tp, title, prompt);
    }

    return title;
}


module.exports = {
    rename: (tp, prompt) => rename_untitled_file(tp, prompt),
};