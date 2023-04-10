package com.example.palette.exception;

import org.apache.http.HttpException;

public class NoScriptException extends HttpException {
	public NoScriptException(String message) {
		super(message);
	}
}