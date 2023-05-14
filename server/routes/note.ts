import express, { Request, Response } from "express";
import { z } from "zod";
import { consola } from "consola";
import { prisma } from "../db";
import { zodErrorResponse } from "../utils/zodErrorResponse";

const router = express.Router();

/**
 * @route /note
 * @method GET
 * @description Get all notes
 * @access Private
 * @query {string} projectId - Project id (optional) to filter notes by project
 * @query {string} companyId - Company id (optional) to filter notes by company
 * @query {string} cursor - Cursor id for pagination (optional)
 * @returns {object} - notes, total, pagination, filter
 */

/**
 * @route /note
 * @method POST
 * @description Create a note
 * @access Private
 * @body {string} projectId - Project id (optional) this is to link it to a project if needed
 * @body {string} companyId - Company id (optional) this is to link it to a company if needed
 * You ONLY pick one of the two above
 * @body {string} content - Note content
 */

/**
 * @route /note/:id
 * @method GET
 * @description Get a note by id
 * @access Private
 * @param {string} id - Note id
 * @returns {object} - note
 */

/**
 * @route /note/:id
 * @method PUT
 * @description Update a note by id
 * @access Private
 * @param {string} id - Note id
 * @body {string} content - Note content
 * @returns {object} - note
 */

/**
 *
 */
